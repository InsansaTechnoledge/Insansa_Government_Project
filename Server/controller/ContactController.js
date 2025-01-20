// import nodemailer from 'nodemailer';

// if(process.env.NODE_ENV !== "production"){
//     (await import('dotenv')).config();
//   }
  
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',  // Correct SMTP server for Office 365
//   port: 587,                   // Port for STARTTLS (not SSL)
//   secure: false,  // Use STARTTLS
//     auth: {
//       user: process.env.EMAIL, // Your Outlook email address
//       pass: process.env.PASSWORD, // Your Outlook email password or app password
//     },
//   });
  
//   // Verify transporter configuration
//   transporter.verify((error, success) => {
//     if (error) {
//       console.error('Error configuring transporter:', error);
//     } else {
//       console.log('Transporter is configured and ready to send emails.');
//     }
//   });

export const sendMail = async (req, res) => {
//     const {firstName, lastName, email,subject, message} = req.body;
// try{
//     const mailOptions={
//         from: process.env.EMAIL, 
//     to: process.env.EMAIL,  
//     replyTo: email,           
//     subject: `New Query from ${firstName} ${lastName}`,
//     text: `
//       Name: ${firstName} ${lastName}
//       Email: ${email}
//       Subject: ${subject}
//       Message: ${message}
//     `,

//     }
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent');
// }
//     catch{
//         console.error('Error sending email:', error);
//         res.status(500).json({message: "Internal Server Error"});

//     }



};