import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import PaperPlane from '../SubmitAnimation/PaperPlane';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config.js';

const Contact = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById("paper");
        const notid = document.getElementById("notpaper");
        
        id.classList.add("flex");
        id.classList.remove("hidden");
        notid.classList.add("blur-sm");
        
        setTimeout(()=> {
            id.classList.remove("flex");
            id.classList.add("hidden");
            notid.classList.remove("blur-sm");
        },1500);

        const formData = new FormData(e.target);
        const data=Object.fromEntries(formData.entries());

        console.log(data);

        try{
            const respons= await axios.post(`${API_BASE_URL}/api/contact/sendMail`,data);
            console.log(respons);

            if(respons.status===201){
         
                const respond=await axios.post(`${API_BASE_URL}/api/contact/sendMailtoUser`,
                    {
                        firstName:data.firstName,
                        lastName:data.lastName,
                        email:data.email
                    });
            }else{
                alert("Email not sent.Try again later!!");
            }
        }catch(error){
            console.error('Error sending email:', error);
        }
       
    };


    return (
        <>
        
            <div id='paper' className='hidden absolute justify-center p-72 z-10'>
                <PaperPlane/>
            </div>
        <div id='notpaper' className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-purple-800 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Our Location</h3>
                                    <p className="text-purple-100">B/321 Monalisa Business Center Manjalpur Vadodara Gujarat INDIA 390011</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Phone Number</h3>
                                    <p className="text-purple-100">+91 9724379123 | 0265-4611836</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Email Address</h3>
                                    <p className="text-purple-100">talent@insansa.com | sales@insansa.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Clock className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Business Hours</h3>
                                    <p className="text-purple-100">Monday - Friday: 10am - 6pm<br />Saturday & Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="100" fill="white" />
                                <circle cx="100" cy="100" r="80" fill="white" />
                                <circle cx="100" cy="100" r="60" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Send us a Message</h2>

                        <form onSubmit={
                            (e)=>{
                                e.preventDefault();
                                handleSubmit(e);
                            }} 
                            className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name='firstName'
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name='lastName'
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name='subject'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name='message'
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-800 text-white py-3 px-6 rounded-lg hover:bg-purple-900 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;