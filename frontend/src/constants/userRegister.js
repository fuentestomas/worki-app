export let workerRegister = {
    fullName: "",
    photo: "",
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
    photo: "",
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
    photo: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
}

export const backupParticularRegister = {
    fullName: "",
    photo: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
}

export let companyRegister = {
    fullName: "",
    photo: "",
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
    photo: "",
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