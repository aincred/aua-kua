// data/controlsData.ts

export type UploadedFile = {
  name: string;
  url: string; // Base64 string or URL
};

export type SavedItem = {
  fileName: string;
  fileUrl: string;
  comment: string;
  evidencesChecked: string[];
  status?: "approved" | "rejected" | "pending";
};

export type Control = {
  sno: number;
  controlNo: string;
  title: string;
  description: string;
  evidences: string[];
  checkedEvidences?: boolean[];
  uploadedFiles?: UploadedFile[]; // updated from File[]
  comment?: string;
  savedHistory?: SavedItem[];
  status?: "approved" | "rejected" | "pending"; // added for status page
  auditorComment?: string;      // ← add this line
};

export const controlsData: Control[] = [
  {
    sno: 1,
    controlNo: "1",
    title: "Security organisation and CISO function",
    description:
      "AUA/KUA should ensure that it has a designated Chief Information Security Officer (CISO) function that oversees information security governance and compliances. The CISO should have independent reporting to its Board or other governing body or chief executive.",
    evidences: [
      "Organisation structure depicting CISO reporting.",
      "CISO appointment letter."
    ],
    status: "pending",
  },
  {
    sno: 2,
    controlNo: "2",
    title: "Appointment of management and technical single point of contact",
    description:
      "AUA/KUA should appoint a Management Single Point of Contact (MPOC) and Technical Single Point of Contact (TPOC) that should oversee the management of the authentication application and Aadhaar related activities. MPOC/TPOC should ensure consistent communication with UIDAI on Aadhaar related requirements and compliances. Any change in MPOC/TPOC should be communicated to UIDAI in a timely manner.",
    evidences: [
      "Appointment letter/ email of appointment of a key management personnel (KMP).",
      "Screenshot of email communication from management to UIDAI having MPOC and TPOC details (appointed by KMP) along with contact information."
    ],
    status: "pending",
  },
  {
    sno: 3,
    controlNo: "3",
    title: "Information security policy and procedure",
    description:
      "AUA/KUA should have an information security policy and information security procedures in accordance with industry leading standards, such as ISO27001 (ISMS), NIST Cyber Security Framework, CSA Framework and ISO27701 (PIMS). The entity’s information security policy should also address the security aspects of Aadhaar, as provided under the Aadhaar Act, regulations and specifications.",
    evidences: [
      "Approved information security policy document with review evidence of current year as well as document control."
    ],
    status: "pending",
  },
  {
    sno: 4,
    controlNo: "4",
    title: "Aadhaar authentication application design",
    description:
      "AUA/KUA should ensure that the authentication application design architecture is documented and validated by UIDAI Technology Centre and covers Aadhaar security requirements.",
    evidences: [
      "Approved authentication Application design architecture.",
      "Intimation to UIDAI with updated authentication Application design architecture in case of any new change in environment."
    ],
    status: "pending",
  },
  {
    sno: 5,
    controlNo: "5",
    title: "Aadhaar data flow documentation",
    description:
      "AUA/KUA should ensure that the Aadhaar data flow is properly documented for its AUA/KUA applications and those of its Sub-AUAs and Sub-KUAs.",
    evidences: [
      "Approved Aadhar data flow diagram/ Document."
    ],
    status: "pending",
  },
  {
    sno: 6,
    controlNo: "6",
    title: "Risk assessment",
    description:
      "AUA/KUA should implement process and procedure to perform periodic (at least annual) information security risk assessment of its ICT infrastructure supporting the authentication application. Further, entity should also perform risk assessment of its third party suppliers / vendors having access to the Aadhaar Application and the data of Aadhaar number holders. Security risks should be documented and reviewed periodically by Security Officers / CISO / those in charge of the security governance of the AUA/KUA and its Sub-AUAs and Sub-KUAs.",
    evidences: [
      "Approved Risk Assessment Methodology/Process Document for own infrastructure and third party with document control.",
      "Risk Register with document control."
    ],
    status: "pending",
  }
];
