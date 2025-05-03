import React, {useEffect, useState} from "react";
import {getBanner} from "../../api/actions";

export default function Banner() {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [bannerPath, setBannerPath] = useState([]);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        getBanner().then(data => setBannerPath(data));
    }, [])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div>
            <img className="banner"
                 src={bannerPath.length > 0 ? (global.config.API.IMAGE_URL +
                     global.config.API.IMAGE_WIDTH.BANNER +
                     bannerPath) : ""}
                 alt="Banner"/>
            <div className="banner-overlay"></div>
        </div>
    )
}