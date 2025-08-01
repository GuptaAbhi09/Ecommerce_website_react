"use client";
import React from "react";
import { SectionHeader } from "./SectionHeader";
import { TeamMember } from "./TeamMember";
import { ContactInfo } from "./ContactInfo";

export const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Ethan Carter",
      title: "CEO",
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/cc28ba6f555650b5d8abcf89b2bb0fc9a843fb1b?width=538",
      altText: "Ethan Carter, CEO",
    },
    {
      name: "Sophia Bennett",
      title: "Head of Marketing",
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/9c1e22eb81cba6959866c7c9209944c8fa8f4291?width=538",
      altText: "Sophia Bennett, Head of Marketing",
    },
    {
      name: "Liam Harper",
      title: "Lead Developer",
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/3802bf5ab89d4cef07bf17e219929e5ee6906aa3?width=538",
      altText: "Liam Harper, Lead Developer",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-white px-4 py-10 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* About Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">About Us</h1>
        </header>

        {/* Company Description */}
        <section>
          <p className="text-base text-neutral-800">
            Tech Haven was founded in 2010 with a vision to provide
            high-quality electronics at affordable prices. Our journey began
            with a small team of tech enthusiasts who believed in making
            technology accessible to everyone. Over the years, we've grown into
            a leading online retailer, serving customers across the nation.
          </p>
        </section>

        {/* Our Mission */}
        <SectionHeader title="Our Mission" />
        <section>
          <p className="text-base text-neutral-800">
            Our mission is to empower individuals through technology. We strive
            to offer a curated selection of the latest gadgets and electronics,
            ensuring that our customers have access to the tools they need to
            thrive in a digital world. We are committed to providing exceptional
            customer service and building lasting relationships with our
            community.
          </p>
        </section>

        {/* Meet the Team */}
        <SectionHeader title="Meet the Team" />
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                title={member.title}
                imageUrl={member.imageUrl}
                altText={member.altText}
              />
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <SectionHeader title="Contact Us" />
        <section className="space-y-2">
          <p className="text-base text-neutral-800">
            Have questions or need assistance? Reach out to us through the
            following channels:
          </p>
          <ContactInfo />
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
