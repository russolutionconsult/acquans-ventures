const fs = require('fs');
const file = 'src/pages/ClientDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `  Calendar, ShieldCheck, ArrowLeft, Loader2, ExternalLink, Mail, X, Menu\n} from 'lucide-react';`,
  `  Calendar, ShieldCheck, ArrowLeft, Loader2, ExternalLink, Mail, X, Menu, BookOpen\n} from 'lucide-react';`
);

content = content.replace(
  `const [activeView, setActiveView] = useState<'overview' | 'projects' | 'messages' | 'settings'>('overview');`,
  `const [activeView, setActiveView] = useState<'overview' | 'projects' | 'messages' | 'settings' | 'guide'>('overview');`
);

content = content.replace(
  `                <SidebarItem\n                  active={activeView === 'settings'}\n                  onClick={() => setActiveView('settings')}\n                  icon={Settings} label="Account Settings"\n                />\n\n                <div className="pt-8 mt-auto px-4">`,
  `                <SidebarItem\n                  active={activeView === 'settings'}\n                  onClick={() => setActiveView('settings')}\n                  icon={Settings} label="Account Settings"\n                />\n                <SidebarItem\n                  active={activeView === 'guide'}\n                  onClick={() => setActiveView('guide')}\n                  icon={BookOpen} label="User Guide"\n                />\n\n                <div className="pt-8 mt-auto px-4">`
);

const guideHtml = `
            {activeView === 'guide' && (
              <div className="space-y-6 max-w-4xl">
                 <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Client Portal Guide</h1>
                    <p className="text-gray-500 mt-1">Learn how to navigate and make the most of your portal.</p>
                 </div>

                 <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 1. Accessing Your Account</h2>
                      <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                        <li><strong className="text-gray-900">Login:</strong> Navigate to the login page. Enter the email address associated with your service request and the temporary password provided by our team.</li>
                        <li><strong className="text-gray-900">Account Settings:</strong> Once logged in, you can view your registered email and update your contact name in the 'Account Settings' tab.</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 2. Navigating the Dashboard</h2>
                      <p className="text-gray-600 mb-3">The dashboard is split into several main views, accessible from the sidebar menu:</p>
                      <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                        <li><strong className="text-gray-900">Overview:</strong> Get a quick glance at your ongoing projects, handed-over (completed) projects, and any pending service requests.</li>
                        <li><strong className="text-gray-900">Active Projects:</strong> View a detailed history of your projects. You can track execution progress, view start dates, and read the latest site status updates.</li>
                        <li><strong className="text-gray-900">Communications:</strong> Access your real-time messaging threads. Unread message indicators will alert you to new replies directly in the sidebar.</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 3. Tracking Project Progress</h2>
                      <p className="text-gray-600 mb-3">In the 'Active Projects' tab, each project card displays:</p>
                      <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                        <li>A dynamic progress bar showing the verified site progress.</li>
                        <li>The current project status (e.g., In Progress, Delivered).</li>
                        <li>The latest site status update securely posted by the administrative team.</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 4. Communicating with the Team</h2>
                      <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                        <li>Click the <strong className="text-gray-900">Message Project Admin</strong> button on any active project, or navigate to the 'Communications' tab to open your chats.</li>
                        <li>This opens a dedicated chat interface for that specific project.</li>
                        <li>You can send messages in real-time to the project managers.</li>
                        <li>You do not need to refresh the page; new messages will appear automatically as they are sent!</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 5. Security & Logout</h2>
                      <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                        <li>When you are finished using the portal, ensure you click <strong className="text-gray-900">Sign Out</strong> located at the bottom of the sidebar to secure your account session.</li>
                      </ul>
                    </section>
                 </div>
              </div>
            )}
`;

content = content.replace(
  `                 </div>\n              </div>\n            )}\n\n          </div>\n        </main>`,
  `                 </div>\n              </div>\n            )}\n${guideHtml}\n          </div>\n        </main>`
);

fs.writeFileSync(file, content);
console.log('patched');
