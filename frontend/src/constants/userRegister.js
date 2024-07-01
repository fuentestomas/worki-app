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
    pushToken: "",
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
    pushToken: "",
}

export let particularRegister = {
    fullName: "",
    photo: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
    pushToken: "",
}

export const backupParticularRegister = {
    fullName: "",
    photo: "",
    emailAddress: "",
    password: "",
    roles: ["person"],
    phoneNumber: "",
    addresses: [""],
    pushToken: "",
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
    pushToken: "",
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
    pushToken: "",
}

export const resetData = () => {
    workerRegister = backupWorkerRegister;
    particularRegister = backupParticularRegister;
    companyRegister = backupCompanyRegister;
}