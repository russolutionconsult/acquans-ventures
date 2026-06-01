const docx = require("docx");
const fs = require("fs");

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "PROJECT CLOSEOUT & HANDOVER AGREEMENT",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({ text: "Date: May 29, 2026", spacing: { before: 200 } }),
                new Paragraph({ text: "Project Name: Acquans Ventures Official Website Development" }),
                new Paragraph({ text: "Client: Acquans Ventures" }),
                new Paragraph({ text: "Developer/Agency: Russolution Consult" }),
                new Paragraph({ text: "Project URL: https://acquansventures.com" }),
                
                new Paragraph({ text: "1. Project Summary", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "This document serves as the formal agreement and acknowledgment that the Acquans Ventures website project has been completed according to the agreed-upon scope of work, is fully deployed, and is now live for public access." }),

                new Paragraph({ text: "2. Completed Deliverables", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "The Developer has successfully delivered and implemented the following:" }),
                
                new Paragraph({
                    children: [
                        new TextRun({ text: "Full Website Development: ", bold: true }),
                        new TextRun("A custom, fully responsive website built with modern web technologies (React, Tailwind CSS).")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Core Pages: ", bold: true }),
                        new TextRun("Overview (Home), About Us, Services, Projects, Gallery, Why Choose Us, Blog, and Contact pages.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Performance & Speed: ", bold: true }),
                        new TextRun("Optimized codebase and assets for rapid loading times on both mobile and desktop devices.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Search Engine Optimization (SEO): ", bold: true }),
                        new TextRun("Comprehensive local SEO integration targeting 'Ghana', Meta titles/descriptions, Open Graph tags, Schema.org Structured Data, and sitemap/robots.txt configured.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Analytics & Tracking: ", bold: true }),
                        new TextRun("Google Analytics 4 (Measurement ID: G-J3TMY4NB5Y) fully integrated, and Google Search Console verified via DNS.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Live Deployment: ", bold: true }),
                        new TextRun("The website has been successfully deployed to the production environment and is securely hosted with an active SSL certificate.")
                    ],
                    bullet: { level: 0 }
                }),

                new Paragraph({ text: "3. Handover Materials", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "Upon signing this closeout agreement, the Client assumes full ownership of the final website deliverables. The Developer has provided access to the Source code repository, Hosting platform, Google Analytics, Google Search Console, and Domain registrar." }),

                new Paragraph({ text: "4. Post-Launch Support & Warranty", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "The Developer agrees to a 30-day bug-fixing and warranty period starting from the date of this agreement. During this time, any critical errors or bugs found in the code will be fixed free of charge. New features requested after this date will be subject to a new agreement." }),

                new Paragraph({ text: "5. Sign-off and Acceptance", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "By signing below, Acquans Ventures acknowledges that the website has been reviewed, tested, and is accepted as complete and fully operational. The project is officially considered closed." }),

                new Paragraph({ text: "For the Client (Acquans Ventures):", bold: true, spacing: { before: 600 } }),
                new Paragraph({ text: "Name: __________________________________" }),
                new Paragraph({ text: "Signature: _______________________________" }),
                new Paragraph({ text: "Date: ___________________________________" }),

                new Paragraph({ text: "For the Developer (Russolution Consult):", bold: true, spacing: { before: 400 } }),
                new Paragraph({ text: "Name: __________________________________" }),
                new Paragraph({ text: "Signature: _______________________________" }),
                new Paragraph({ text: "Date: ___________________________________" }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Project_Closeout_Agreement_Final.docx", buffer);
    console.log("Document generated successfully!");
});
