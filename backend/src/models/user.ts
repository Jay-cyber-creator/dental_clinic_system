import bcrypt from 'bcrypt';
import pool from '../config/database';

export interface User {
  id: number;
  clinic_id: number | null;
  full_name: string;
  email: string;
  password_hash: string;
  role: 'SUPER_ADMIN' | 'CLINIC_ADMIN' | 'STAFF' | 'PATIENT';
  phone: string | null;
  created_at: Date;
}

export interface CreateUserData {
  clinic_id?: number;
  full_name: string;
  email: string;
  password: string;
  role: 'SUPER_ADMIN' | 'CLINIC_ADMIN' | 'STAFF' | 'PATIENT';
  phone?: string;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const { clinic_id, full_name, email, password, role, phone } = userData;

  // Hash the password
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const query = `
    INSERT INTO users (clinic_id, full_name, email, password_hash, role, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [clinic_id || null, full_name, email, password_hash, role, phone || null];

  const [result] = await pool.execute(query, values);
  const insertId = (result as any).insertId;

  // Fetch the created user
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [insertId]);
  const user = (rows as any[])[0];

  return {
    id: user.id,
    clinic_id: user.clinic_id,
    full_name: user.full_name,
    email: user.email,
    password_hash: user.password_hash,
    role: user.role,
    phone: user.phone,
    created_at: new Date(user.created_at),
  };
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = (rows as any[])[0];

  if (!user) return null;

  return {
    id: user.id,
    clinic_id: user.clinic_id,
    full_name: user.full_name,
    email: user.email,
    password_hash: user.password_hash,
    role: user.role,
    phone: user.phone,
    created_at: new Date(user.created_at),
  };
}

export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  const user = (rows as any[])[0];

  if (!user) return null;

  return {
    id: user.id,
    clinic_id: user.clinic_id,
    full_name: user.full_name,
    email: user.email,
    password_hash: user.password_hash,
    role: user.role,
    phone: user.phone,
    created_at: new Date(user.created_at),
  };
}

export async function updateUser(id: number, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User | null> {
  const fields = [];
  const values = [];

  if (updates.clinic_id !== undefined) {
    fields.push('clinic_id = ?');
    values.push(updates.clinic_id);
  }
  if (updates.full_name !== undefined) {
    fields.push('full_name = ?');
    values.push(updates.full_name);
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  if (updates.password_hash !== undefined) {
    fields.push('password_hash = ?');
    values.push(updates.password_hash);
  }
  if (updates.role !== undefined) {
    fields.push('role = ?');
    values.push(updates.role);
  }
  if (updates.phone !== undefined) {
    fields.push('phone = ?');
    values.push(updates.phone);
  }

  if (fields.length === 0) return null;

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  await pool.execute(query, values);

  // Return the updated user
  return findUserById(id);
}

export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return (result as any).affectedRows > 0;
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
