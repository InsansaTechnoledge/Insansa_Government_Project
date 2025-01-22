import { transporter } from '../controller/contactController.js';
import Subscriber from '../models/SubscriberModel.js';

// subscribed user mailling list
export const updateMail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL1,
            to: email,
            replyTo: process.env.EMAIL1,
            subject: `Hello ${name}`,
            html: `
            <p>Dear ${name},</p>
            <p>We wanted to let you know that there are new updates available on our website!</p>
            <p>Visit <a href="https://yourwebsite.com" target="_blank">YourWebsite.com</a> to explore the latest updates and new data.</p>
            <p>If you have any questions or need assistance, please feel free to reply to this email or contact us directly.</p>
            <p>Thank you for staying with us!</p>
            <br>
            <p>Warm regards,</p>
            <p><b>Insansa Techknowledge Pvt. Ltd.</b></p>
            <p>MyWebsite.com</p>
            <p>+91 9724379123 | 0265-4611836</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }


};

export const create = async (req, res) => {
    let subscriber = await Subscriber.findOne({ email: req.body.email });
    if (subscriber) {
        return res.status(202).json("Subscriber already exists");
    }
    else {
        try {
            subscriber = new Subscriber({
                name: req.body.name,
                email: req.body.email
            });
            await subscriber.save();
            subscribeMail(subscriber.email, subscriber.name);
            res.status(201).json("Subscriber created successfully");

        } catch (error) {
            console.error('Error creating subscriber:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const subscribeMail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL1,
            to: email,
            replyTo: process.env.EMAIL1,
            subject: `Thank you for subscribing, ${name}!`,
            html: `
                        <p>Dear ${name},</p>
                        <p>Thank you for subscribing to our website! We are thrilled to have you on board.</p>
                        <p>Stay tuned for exciting updates, new features, and much more. We are committed to providing you with the best content and services.</p>
                        <p>If you have any questions or need assistance, feel free to reply to this email or contact us anytime.</p>
                        <br>
                        <p>Warm regards,</p>
                        <p><b>Insansa Techknowledge Pvt. Ltd.</b></p>
                        <p>MyWebsite.com</p>
                        <p>+91 9724379123 | 0265-4611836</p>
                    `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending thank you email to:', email, error);
        throw new Error('Internal Server Error');
    }
};
