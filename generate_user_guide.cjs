const docx = require("docx");
const fs = require("fs");

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = docx;

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "ACQUANS VENTURES - PLATFORM USER GUIDES",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: "Welcome to the Acquans Ventures Platform User Guides. This document is divided into two sections: Part 1 for Administrators and Part 2 for Clients.",
                    spacing: { before: 200, after: 400 }
                }),
                
                // ==========================================
                // PART 1: ADMIN GUIDE
                // ==========================================
                new Paragraph({
                    text: "PART 1: ADMINISTRATOR GUIDE",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 400, after: 400 }
                }),
                new Paragraph({
                    text: "This section covers the tools and features available to the Acquans Ventures management team for handling inquiries, managing projects, and communicating with clients.",
                }),

                new Paragraph({ text: "1. Dashboard Overview", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "Upon logging in, you will see the Overview tab which provides:" }),
                new Paragraph({ children: [new TextRun("High-level statistics: Total Quotes, Pending Requests, Successful Clients.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Recent Quote Requests: The latest inquiries submitted via the website contact forms.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Recent Client Replies: A quick view of new messages sent by clients.")], bullet: { level: 0 } }),

                new Paragraph({ text: "2. Managing Project Inquiries (Quotes)", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "Navigate to the 'Project Inquiries' tab to manage leads:" }),
                new Paragraph({ children: [new TextRun("View full details of what services prospective clients are requesting.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Update the status of an inquiry (e.g., mark as 'Reviewed', 'Contacted', or 'Converted').")], bullet: { level: 0 } }),

                new Paragraph({ text: "3. Creating Client Accounts", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "Once a project inquiry is approved and converted to an active project:" }),
                new Paragraph({ children: [new TextRun("Click the 'Create Client Account' button in the top right corner.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Select the corresponding quote from the dropdown list. The system will automatically pull in the client's name and email.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Assign a temporary password and create the account. This will give the client access to their portal.")], bullet: { level: 0 } }),

                new Paragraph({ text: "4. Managing Active Projects", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "In the 'Projects' tab, you can oversee ongoing site works:" }),
                new Paragraph({ children: [new TextRun("Execution Progress: Manually update the percentage slider to reflect real-world site progress.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Project Info: Post status updates that the client will see on their dashboard.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Location: Set the project site location.")], bullet: { level: 0 } }),

                new Paragraph({ text: "5. Client Management & Impersonation", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "In the 'Clients' tab, you can view a list of all registered clients." }),
                new Paragraph({ children: [new TextRun("Click 'View Portal' on any client to securely log into their dashboard. This allows you to see exactly what the client sees.")], bullet: { level: 0 } }),
                new Paragraph({ children: [new TextRun("Click 'Exit View' at the top of the screen to return to the Admin dashboard.")], bullet: { level: 0 } }),

                new Paragraph({ text: "6. Client Communications", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "You can open the real-time chat interface for any specific project to send messages and updates directly to the client." }),

                // Page break between guides
                new Paragraph({ children: [new PageBreak()] }),

                // ==========================================
                // PART 2: CLIENT GUIDE
                // ==========================================
                new Paragraph({
                    text: "PART 2: CLIENT PORTAL GUIDE",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 400, after: 400 }
                }),
                new Paragraph({
                    text: "Welcome to your dedicated Client Portal! This platform allows you to monitor your projects in real-time and communicate directly with the Acquans Ventures management team.",
                }),
                
                new Paragraph({ text: "1. Accessing Your Account", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Login: ", bold: true }),
                        new TextRun("Navigate to the login page. Enter the email address associated with your service request and the temporary password provided by our team.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Account Settings: ", bold: true }),
                        new TextRun("Once logged in, you can view your registered email and update your contact name in the 'Account Settings' tab.")
                    ],
                    bullet: { level: 0 }
                }),

                new Paragraph({ text: "2. Navigating the Dashboard", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "The dashboard is split into several main views, accessible from the sidebar menu:" }),
                
                new Paragraph({
                    children: [
                        new TextRun({ text: "Overview: ", bold: true }),
                        new TextRun("Get a quick glance at your ongoing projects, handed-over (completed) projects, and any pending service requests.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Active Projects: ", bold: true }),
                        new TextRun("View a detailed history of your projects. You can track execution progress (0-100%), view the start date, monitor site locations, and read the latest site status updates.")
                    ],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Communications: ", bold: true }),
                        new TextRun("Access your real-time messaging threads. Unread message indicators will alert you to new replies directly in the sidebar.")
                    ],
                    bullet: { level: 0 }
                }),

                new Paragraph({ text: "3. Tracking Project Progress", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({ text: "In the 'Active Projects' tab, each project card displays:" }),
                new Paragraph({
                    children: [new TextRun("A dynamic progress bar showing the verified site progress.")],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [new TextRun("The current project status (e.g., In Progress, Delivered).")],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [new TextRun("The latest site status update securely posted by the administrative team.")],
                    bullet: { level: 0 }
                }),

                new Paragraph({ text: "4. Communicating with the Team", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({
                    children: [new TextRun("Click the 'Message Project Admin' button on any active project, or navigate to the 'Communications' tab to open your chats.")],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [new TextRun("This opens a dedicated chat interface for that specific project.")],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [new TextRun("You can send messages in real-time to the project managers.")],
                    bullet: { level: 0 }
                }),
                new Paragraph({
                    children: [new TextRun("You do not need to refresh the page; new messages will appear automatically as they are sent!")],
                    bullet: { level: 0 }
                }),

                new Paragraph({ text: "5. Security & Logout", heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
                new Paragraph({
                    children: [new TextRun("When you are finished using the portal, ensure you click 'Sign Out' located at the bottom of the sidebar to secure your account session.")],
                    bullet: { level: 0 }
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Acquans_Ventures_Platform_User_Guides.docx", buffer);
    console.log("User guides docx generated successfully!");
});
