export let workerRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["worker"],
    phoneNumber: "",
    addresses: [""],
    description: "",
    avgPayRate: "",
    category: "",
    job: "",
}

export const backupWorkerRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["worker"],
    phoneNumber: "",
    addresses: [""],
    description: "",
    avgPayRate: "",
    category: "",
    job: "",
}

export let particularRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
}

export const backupParticularRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
}

export let companyRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["business"],
    phoneNumber: "",
    addresses: [""],
    description: "",
    avgPayRate: "",
    category: "",
}

export const backupCompanyRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["business"],
    phoneNumber: "",
    addresses: [""],
    description: "",
    avgPayRate: "",
    category: "",
}

export const resetData = () => {
    workerRegister = backupWorkerRegister;
    particularRegister = backupParticularRegister;
    companyRegister = backupCompanyRegister;
}