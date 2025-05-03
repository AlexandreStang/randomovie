import React from "react";

export default function Crew({crew, config, maxCrewMembers}) {
    const {title, job} = config;

    const filteredCrew = (crew || []).filter((crewMember) => crewMember.job === job);

    if (filteredCrew.length === 0) {
        return null;
    }

    return (
        <ul>
            <li><h4>{title}</h4></li>
            {filteredCrew.slice(0, maxCrewMembers).map((crewMember) => (
                <li key={crewMember.id}>{crewMember.name}</li>
            ))}
            {/*{filteredCrew.length > maxCrewMembers ? <li>. . .</li> : ""}*/}
        </ul>
    );
}