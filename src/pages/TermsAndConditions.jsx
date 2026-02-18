import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';

export default function TermsAndConditions() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Read our legal terms and conditions for using our services."
      lastUpdated="February 11, 2026"
    >
      <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
      <p>
        We are Printiply LLC ("Company," "we," "us," "our"), a company registered in Louisiana, United States at 3014 Dauphine st ste A PM3 357287, New Orleans, LA 70117.
      </p>
      <p>
        We operate the website <a href="https://printiply.shop/">https://printiply.shop/</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
      </p>
      <p>
        Prime Fix Solutions is your trusted destination for authentic, high-performance printers and printing accessories from HP and other leading technology brands.
      </p>
      <p>
        You can contact us by phone at 00000000000, email at <a href="mailto:info@printiply.shop">info@printiply.shop</a>, or by mail to 3014 Dauphine st ste A PM3 357287, New Orleans, LA 70117, United States.
      </p>
      <p>
        These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Printiply LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
      </p>

      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 my-12 not-prose">
        <h2 className="text-2xl font-black text-slate-900 uppercase mt-0 mb-6 tracking-tighter">TABLE OF CONTENTS</h2>
        <ol className="text-xs font-black text-slate-500 uppercase tracking-widest grid grid-cols-1 md:grid-cols-2 gap-4 list-decimal pl-5">
          <li>OUR SERVICES</li>
          <li>INTELLECTUAL PROPERTY RIGHTS</li>
          <li>USER REPRESENTATIONS</li>
          <li>USER REGISTRATION</li>
          <li>PRODUCTS</li>
          <li>PURCHASES AND PAYMENT</li>
          <li>RETURN POLICY</li>
          <li>PROHIBITED ACTIVITIES</li>
          <li>USER GENERATED CONTRIBUTIONS</li>
          <li>CONTRIBUTION LICENSE</li>
          <li>SERVICES MANAGEMENT</li>
          <li>PRIVACY POLICY</li>
          <li>TERM AND TERMINATION</li>
          <li>MODIFICATIONS AND INTERRUPTIONS</li>
          <li>GOVERNING LAW</li>
          <li>DISPUTE RESOLUTION</li>
          <li>CORRECTIONS</li>
          <li>DISCLAIMER</li>
          <li>LIMITATIONS OF LIABILITY</li>
          <li>INDEMNIFICATION</li>
          <li>USER DATA</li>
          <li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
          <li>CALIFORNIA USERS AND RESIDENTS</li>
          <li>MISCELLANEOUS</li>
          <li>CONTACT US</li>
        </ol>
      </div>

      <hr />

      <h2>1. OUR SERVICES</h2>
      <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>

      <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
      <h3>Our intellectual property</h3>
      <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>

      <h2>3. USER REPRESENTATIONS</h2>
      <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms.</p>

      <h2>4. USER REGISTRATION</h2>
      <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password.</p>

      <h2>5. PRODUCTS</h2>
      <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.</p>

      <h2>6. PURCHASES AND PAYMENT</h2>
      <p>We accept the following forms of payment: - Visa - Mastercard - PayPal</p>
      <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services.</p>

      <h2>7. RETURN POLICY</h2>
      <p>Please review our Return Policy prior to making any purchases: <a href="https://printiply.shop/return-policy">https://printiply.shop/return-policy</a>.</p>

      <h2>8. PROHIBITED ACTIVITIES</h2>
      <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

      <h2>15. GOVERNING LAW</h2>
      <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Louisiana applicable to agreements made and to be entirely performed within the State of Louisiana, without regard to its conflict of law principles.</p>

      <h2>18. DISCLAIMER</h2>
      <p className="font-black text-slate-900 uppercase tracking-tight italic">THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.</p>

      <hr />
      <h2>25. CONTACT US</h2>
      <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-2 uppercase tracking-tighter">
          <p className="text-slate-900 font-black">Printiply LLC</p>
          <p>3014 Dauphine st ste A PM3 357287</p>
          <p>New Orleans, LA 70117</p>
          <p>United States</p>
          <p className="pt-4 text-blue-600 font-black">Email: info@printiply.shop</p>
        </address>
      </div>
    </PolicyLayout>
  );
}
