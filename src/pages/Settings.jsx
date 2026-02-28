import { useState } from "react"
import {
  FiGlobe,
  FiShield,
  FiBell,
  FiDatabase
} from "react-icons/fi"

const Settings = () => {

  const [activeTab, setActiveTab] = useState("General")

  const tabs = [
    { name: "General", icon: <FiGlobe /> },
    { name: "Security", icon: <FiShield /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Data Privacy", icon: <FiDatabase /> }
  ]

  const Toggle = ({ enabled, setEnabled }) => (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition 
      ${enabled ? "bg-primary" : "bg-gray-300"}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition 
        ${enabled ? "translate-x-6" : ""}`}
      />
    </div>
  )

  const [twoFA, setTwoFA] = useState(true)
  const [bcrypt, setBcrypt] = useState(true)
  const [loginTracking, setLoginTracking] = useState(true)
  const [secureUpload, setSecureUpload] = useState(true)
  const [rbac, setRbac] = useState(true)
  const [passwordPolicy, setPasswordPolicy] = useState(true)

  const [emailNotif, setEmailNotif] = useState(true)
  const [tenderUpdates, setTenderUpdates] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [deadlineReminders, setDeadlineReminders] = useState(true)

  const [encryption, setEncryption] = useState(true)
  const [bidVisibility, setBidVisibility] = useState(true)
  const [gdpr, setGdpr] = useState(true)
  const [dataExport, setDataExport] = useState(true)
  const [softDelete, setSoftDelete] = useState(true)

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Configure system settings, security controls, and data privacy
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3 bg-gray-100 p-2 rounded-lg w-fit mb-8">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition
            ${activeTab === tab.name
                ? "bg-white shadow text-primary"
                : "text-gray-600"}`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white rounded-xl border shadow-sm p-8 max-w-3xl">

        {/* ================= GENERAL ================= */}
        {activeTab === "General" && (
          <div className="space-y-6">

            <h2 className="font-semibold text-lg">System Configuration</h2>

            <div>
              <label className="block mb-2">Application Name</label>
              <input className="input-style" defaultValue="AdminHub" />
            </div>

            <div>
              <label className="block mb-2">Support Email</label>
              <input className="input-style" defaultValue="support@adminhub.com" />
            </div>

            <div>
              <label className="block mb-2">Default Currency</label>
              <input className="input-style" defaultValue="USD" />
            </div>

            <div>
              <label className="block mb-2">Tax Percentage (%)</label>
              <input className="input-style" defaultValue="18" />
            </div>

            <div>
              <label className="block mb-2">Default Timezone</label>
              <input className="input-style" defaultValue="UTC" />
            </div>

            <div>
              <label className="block mb-2">Deadline Reminder Interval (days)</label>
              <input className="input-style" defaultValue="3" />
            </div>

            <button className="bg-primary text-white px-6 py-2 rounded-lg">
              Save Settings
            </button>
          </div>
        )}

        {/* ================= SECURITY ================= */}
        {activeTab === "Security" && (
          <div className="space-y-6">

            <h2 className="font-semibold text-lg">Security Controls</h2>

            <SettingRow title="Two-Factor Authentication"
              desc="Require 2FA for all admin accounts">
              <Toggle enabled={twoFA} setEnabled={setTwoFA} />
            </SettingRow>

            <SettingRow title="Password Hashing (bcrypt)"
              desc="All passwords stored using bcrypt encryption">
              <Toggle enabled={bcrypt} setEnabled={setBcrypt} />
            </SettingRow>

            <SettingRow title="Login Attempt Tracking"
              desc="Block IP after consecutive failures">
              <Toggle enabled={loginTracking} setEnabled={setLoginTracking} />
            </SettingRow>

            <SettingRow title="Secure File Upload Validation"
              desc="Validate file types and scan uploads">
              <Toggle enabled={secureUpload} setEnabled={setSecureUpload} />
            </SettingRow>

            <SettingRow title="Role-Based Access Restrictions"
              desc="Enforce RBAC for all module access">
              <Toggle enabled={rbac} setEnabled={setRbac} />
            </SettingRow>

            <SettingRow title="Password Policy"
              desc="Minimum 12 characters with complexity">
              <Toggle enabled={passwordPolicy} setEnabled={setPasswordPolicy} />
            </SettingRow>

          </div>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {activeTab === "Notifications" && (
          <div className="space-y-6">

            <h2 className="font-semibold text-lg">Notification Preferences</h2>

            <SettingRow title="Email Notifications"
              desc="Receive system alerts via email">
              <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
            </SettingRow>

            <SettingRow title="Tender Updates"
              desc="Notify on tender status changes">
              <Toggle enabled={tenderUpdates} setEnabled={setTenderUpdates} />
            </SettingRow>

            <SettingRow title="Security Alerts"
              desc="Critical security event notifications">
              <Toggle enabled={securityAlerts} setEnabled={setSecurityAlerts} />
            </SettingRow>

            <SettingRow title="Deadline Reminders"
              desc="Upcoming tender deadline reminders">
              <Toggle enabled={deadlineReminders} setEnabled={setDeadlineReminders} />
            </SettingRow>

            <button className="border px-4 py-2 rounded-lg">
              Manage Templates
            </button>

          </div>
        )}

        {/* ================= DATA PRIVACY ================= */}
        {activeTab === "Data Privacy" && (
          <div className="space-y-6">

            <h2 className="font-semibold text-lg">Data Privacy & Retention</h2>

            <SettingRow title="Data Encryption at Rest"
              desc="AES-256 encryption for stored data">
              <Toggle enabled={encryption} setEnabled={setEncryption} />
            </SettingRow>

            <SettingRow title="Confidential Bid Visibility"
              desc="Suppliers cannot see other bids">
              <Toggle enabled={bidVisibility} setEnabled={setBidVisibility} />
            </SettingRow>

            <SettingRow title="GDPR Compliance Mode"
              desc="Enable GDPR data protection features">
              <Toggle enabled={gdpr} setEnabled={setGdpr} />
            </SettingRow>

            <SettingRow title="Data Export on Deletion"
              desc="Auto-export user data before account deletion">
              <Toggle enabled={dataExport} setEnabled={setDataExport} />
            </SettingRow>

            <SettingRow title="Soft Delete Only"
              desc="No record permanent deletion — soft delete only">
              <Toggle enabled={softDelete} setEnabled={setSoftDelete} />
            </SettingRow>

          </div>
        )}

      </div>
    </div>
  )
}

const SettingRow = ({ title, desc, children }) => (
  <div className="flex justify-between items-center border-b pb-4">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
    {children}
  </div>
)

export default Settings