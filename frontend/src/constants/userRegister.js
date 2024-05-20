export let workerRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["business"],
    phoneNumber: "",
    address: "",
    description: "",
    avgPayRate: "",
    category: "",
    job: "",
}

export const backupWorkerRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["business"],
    phoneNumber: "",
    address: "",
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
    address: "",
}

export const backupParticularRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    address: "",
}

export let companyRegister = {
    fullName: "",
    emailAddress: "",
    password: "",
    roles: ["business"],
    phoneNumber: "",
    address: "",
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
    address: "",
    description: "",
    avgPayRate: "",
    category: "",
}

export const resetData = () => {
    workerRegister = backupWorkerRegister;
    particularRegister = backupParticularRegister;
    companyRegister = backupCompanyRegister;
}