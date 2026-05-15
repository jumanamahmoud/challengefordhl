<h1>📦 DHL Incident Report System (IRS) — RegEx & Cloud Integration </h1>

A resilient, full-stack incident management pipeline combining UiPath RPA for data acquisition, RegEx for high-speed pattern matching, and a Next.js + Supabase cloud dashboard for real-time monitoring.

Demo Video Link: https://drive.google.com/drive/folders/11O5cVxNCGGTi2Zn4Gd3MwassLLn7DQpi?usp=drive_link 

<h2>🚀 System Architecture</h2>


<h2> 📂 Project Structure </h2>

DHLWebTech2026/
├── rpa_uipath/
│   ├── DHLIRSProcessor.xaml    # Main Robot logic (RegEx Engine)
│   ├── project.json            # Dependencies
│   └── README.md               # RPA Setup & SSL Fixes
├── web_dashboard/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/      # Incident Viewer
│   │   │   └── login/          # Auth Page
│   │   └── lib/
│   │       └── supabase.ts     # Cloud Client
│   └── .env.local              # API Keys (URL & Anon Key)
└── README.md                   # This file


<h2> 🛠️ Implementation Phases </h2>
<b> Phase 1: Inbound Data Acquisition (Google Drive)</b>

The process starts by connecting to the "Inbound Incidents" repository on Google Drive using GSuite activities.

File Discovery: The bot scans the folder and identifies all pending incident files.

Duplicate Prevention: Before processing, the bot queries Supabase. If the file's unique drive_id already exists, the bot skips it, ensuring data integrity and saving processing time.

<h3><b>Phase 2: Text Pre-processing</b> </h3>
Once a new incident is identified:

Content Fetching: The bot downloads and reads the file content into a fileContent string variable.

Sanitization: The bot "cleans" the text by removing extra line breaks and escaping double quotes to ensure the JSON payload is compliant with the Supabase REST API.

<h3> <b> Phase 3: Technical Extraction (The RegEx Engine)</b></h3>
The core of the system uses Regular Expressions (RegEx) to instantly pull structured data from messy text without the need for expensive AI APIs:

Pattern Matching: The bot hunts for specific markers (e.g., Tracking ID:, Regards,) using a waterfall logic.

Data Points: It extracts the Tracking ID, Customer Name, Issue Summary, and Priority based on pre-defined text patterns.

<h3><b>Phase 4: Data Validation & Handshaking</b></h3>
Status Tracking: The bot creates a "Draft" record in the database marked as "In Progress." This ensures that if the process is interrupted, the record is flagged for recovery.

Error Handling: To bypass campus network restrictions (Status 0 error), the bot is configured with SSL Bypass and forced TLS 1.2 protocols.

<h3><b> Phase 5: Storage & Final Logging</b></h3>
Database Integration: Extracted data is sent to Supabase via an API PATCH call, updating the record to "Completed."

Reporting: The bot generates a live execution log (e.g., [SUCCESS] Processed MY-99221) for a full audit trail.

<h1>⚙️ Quick Start</h1> 
1. Database (Supabase)
Run this SQL in your Supabase Editor:

SQL
create table public.incidents (
  id uuid default gen_random_uuid() primary key,
  tracking_id text,
  customer_name text,
  issue_summary text,
  priority text,
  status text default 'In Progress',
  incident_text text, -- New: Stores raw extracted text
  drive_id text unique,
  created_at timestamp with time zone default now()
);

2. RPA Worker (UiPath)
Open DHLIRSProcessor.xaml.
Check the "Disable SSL verification" box in the HTTP Request activity.

Update headers with your Supabase URL and Keys.

3. Dashboard (Next.js)
Bash
cd web_dashboard
npm install
npm run dev
