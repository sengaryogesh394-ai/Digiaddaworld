const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_USERNAME ;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with email:', adminEmail);
      console.log('Updating password...');
      
      // Update password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      
      console.log('✅ Admin password updated successfully!');
      console.log('');
      console.log('Login credentials:');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      console.log('');
      process.exit(0);
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    console.log('Creating admin user...');
    await User.create({
      name: 'DigiAdda Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
