import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string);
//     console.log('🗄️ MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error', error);
//     process.exit(1);
//   }
// };
export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log('🗄️ MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
  // Дополнительно добавим обработку ошибок подключения
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error (event):', err);
  });
  
  