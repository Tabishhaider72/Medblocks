import initSqlJs from 'sql.js';

let db;
let SQL;

const LOCAL_STORAGE_KEY = "patient-db";
const CHANNEL_NAME = "patient-sync";
const channel = new BroadcastChannel(CHANNEL_NAME);

// 👉 Save database to localStorage
const saveToLocalStorage = () => {
  const binaryArray = db.export();
  const base64 = btoa(String.fromCharCode(...binaryArray));
  localStorage.setItem(LOCAL_STORAGE_KEY, base64);
  channel.postMessage("update"); // Notify other tabs
};

// 👉 Load database from localStorage
const loadFromLocalStorage = () => {
  const base64 = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!base64) return null;
  const binaryStr = atob(base64);
  const bytes = new Uint8Array([...binaryStr].map(char => char.charCodeAt(0)));
  return new SQL.Database(bytes);
};

// 👉 Initialize database
export const initDb = async () => {
  SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  db = loadFromLocalStorage() || new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      age INTEGER,
      gender TEXT,
      contact TEXT,
      address TEXT,
      visitDate TEXT,
      department TEXT,
      symptoms TEXT,
      doctor TEXT,
      type TEXT,
      insurance BOOLEAN,
      policyInfo TEXT,
      consent BOOLEAN
    )
  `);

  // 👂 Listen for changes from other tabs
  channel.onmessage = (event) => {
    if (event.data === "update") {
      db = loadFromLocalStorage();
    }
  };
};

// 👉 Save patient
export const savePatientToDB = (patient) => {
  const stmt = db.prepare(`
    INSERT INTO patients (
      fullName, age, gender, contact, address,
      visitDate, department, symptoms, doctor,
      type, insurance, policyInfo, consent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([
    patient.fullName,
    patient.age,
    patient.gender,
    patient.contact,
    patient.address,
    patient.visitDate,
    patient.department,
    patient.symptoms,
    patient.doctor,
    patient.type,
    patient.insurance ? 1 : 0,
    patient.policyInfo || "",
    patient.consent ? 1 : 0
  ]);

  saveToLocalStorage();
};

// 👉 Fetch all patients
export const getAllPatients = async () => {
  if (!db) {
    console.error("Database not initialized yet.");
    return [];
  }

  const stmt = db.prepare('SELECT * FROM patients ORDER BY id DESC');
  const results = [];

  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }

  return results;
};
