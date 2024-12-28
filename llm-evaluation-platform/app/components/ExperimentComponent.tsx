'use client';
enum ExperimentStatus {
    Pending = "cool",
    Running = "running",
    Completed = "completed"
}

interface Experiment {
    id:number;
    name:string;
    prompt:string;
    status: ExperimentStatus
}
let start: Experiment = {
    id:1,
    name: "Test Experiment",
    prompt: "What is the weather today?",
    status: ExperimentStatus.Pending
}

export default function ExperimentComp() {
    
}