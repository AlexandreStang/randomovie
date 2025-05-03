import React from "react";

export default function CastList({cast, maxCast}) {

    if ((cast || []).length === 0) {
        return null
    }

    return (
        <ul className="full-row last-row">
            <li><h4>Cast</h4></li>
            {cast ? cast.slice(0, maxCast).map(
                (castMember) => <li key={castMember.id}>{castMember.name}</li>) : <li>Unknown</li>}
        </ul>
    )
}