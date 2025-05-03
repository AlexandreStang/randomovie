import React from "react";
import Crew from "./Crew";

const crewConfig = [
    {title: "Directed by", job: "Director"},
    {title: "Screenplay by", job: "Screenplay"},
    {title: "Story by", job: "Story"},
    {title: "Characters by", job: "Characters"},
    {title: "Produced by", job: "Producer"},
    {title: "Edited by", job: "Editor"},
    {title: "Music by", job: "Original Music Composer"},
]

export default function CrewList({crew, maxJobs}) {

    const filteredConfigs = crewConfig.filter(config =>
        (crew || []).some(crewMember => crewMember.job === config.job)
    ).slice(0, maxJobs);

    return (
        <>
            {filteredConfigs.map((config) => (
                <Crew key={config.job} crew={crew} config={config} maxCrewMembers={3}/>
            ))}
        </>
    );
}