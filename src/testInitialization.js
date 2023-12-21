import { CIQ } from "chartiq/js/standard";

function handleQueryString() {
    // A Strategy to optionally use the Study Menu or the default Study Browser via URL query string.
    const useStudyMenu = /studymenu=y/i.test(document.location.href);
    if (useStudyMenu && CIQ.Studies.Favorites) {
        CIQ.Studies.Favorites_disabled = CIQ.Studies.Favorites;
        delete CIQ.Studies.Favorites;
    } else if (!useStudyMenu && CIQ.Studies.Favorites_disabled) {
        CIQ.Studies.Favorites = CIQ.Studies.Favorites_disabled;
    }

    // Used for internal testing. Hard set the yaxis width to 60px.
    const setYaxis = /yaxis=60/i.test(document.location.href);
    if (setYaxis) {
        CIQ.ChartEngine.YAxis.prototype.width = 60;
    }
}

handleQueryString();