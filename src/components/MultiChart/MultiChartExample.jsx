import React, { useEffect, useRef } from "react";

// Import necessary ChartIQ library files
import "chartiq/css/normalize.css";

import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";
import "chartiq/css/webcomponents.css"

import "chartiq/js/standard";
import "chartiq/js/addOns";
import { CIQ } from "chartiq/js/components";


import getLicenseKey from "keyDir/key.js";
getLicenseKey(CIQ);

import ChartTemplate from "./TemplateMultiChart";
import { getCustomConfig } from "./resources"; // ChartIQ library resources

export { CIQ };

const MultiChartExample = ({ config: propsConfig, resources, chartInitialized, children }) => {
    const container = useRef(null);
    const configObj = getCustomConfig({ resources });
    CIQ.extend(configObj, propsConfig);
    const config = { ...configObj };

    useEffect(() => {

        portalizeContextDialogs(container.current);

        // Create charts after the context is ready
        const chartEntries = [
            {
                symbol: {
                    symbol: "IBM",
                    name: "International Business Machines Corp.",
                    exchDisp: "NYSE"
                }
            },
            { symbol: "AAPL" }
        ];
        const store = new CIQ.NameValueStore();
        config.multiChartId = "_ciq";
        config.addOns.tableView.coverContainer =
            ".ciq-multi-chart-container-wrapper";
        store.get("multiCharts" + config.multiChartId, (err, chartConfig) => {
            const {
                charts = chartEntries,
                colCount = 2,
                rowCount = 1,
                gridTemplate
            } = chartConfig || {};

            const stxArr = new CIQ.UI.Multichart().createCharts(
                {
                    chartsConfig: {
                        charts,
                        colCount,
                        rowCount,
                        gridTemplate
                    },
                    containerId: container.current
                },
                config
            );

            // Add allCharts property
            if (!container.current.hasOwnProperty("charts")) {
                Object.defineProperty(container.current, "charts", {
                    get: function () {
                        return container.current
                            .getCharts()
                            .filter(
                                ({ container }) => container && !container.hasAttribute("cq-context-engine")
                            ).reverse();
                    }
                });
            }

            if (chartInitialized) {
                chartInitialized({ chartContainer: container.current });
            }
            Object.assign(window, { CIQ, stxArr });
        });

        // Cleanup function to destroy the ChartEngine instances
        return () => {
            const charts = container?.current?.charts || [];
            charts?.forEach((stx) => {
                stx.destroy();
                stx.draw = () => { };
            });
        };
    }, []);
    return (
        <>
            <cq-context ref={container} cq-hide-menu-periodicity="">
                {children ? (
                    React.cloneElement(children, { config })
                ) : (
                    <ChartTemplate />
                )}
            </cq-context>
            <cq-dialogs>
                <cq-dialog>
                    <cq-drawing-context></cq-drawing-context>
                </cq-dialog>

                <cq-dialog>
                    <cq-study-context></cq-study-context>
                </cq-dialog>
            </cq-dialogs>
        </>
    );
};

/**
 * For applications that have more than one chart, keep a single dialog of the same type
 * and move it outside the context node to be shared by all chart components
 */
function portalizeContextDialogs(container) {
    container.querySelectorAll("cq-dialog").forEach((dialog) => {
        dialog.remove();
        if (!dialogPortalized(dialog)) {
            document.body.appendChild(dialog);
        }
    });
}

function dialogPortalized(el) {
    const tag = el.firstChild.nodeName.toLowerCase();
    let result = Array.from(document.querySelectorAll(tag)).some(
        (el) => !el.closest("cq-context")
    );
    return result;
}

// Adjustments to compensate for when webpack config is not available
(function initDynamicShare() {
    // Decorate the library function to avoid copying html2canvas.min.js to distribution to js/thirdparty directory
    const fullChart2PNG = CIQ.Share.fullChart2PNG;
    CIQ.Share.fullChart2PNG = function (stx, params, cb) {
        import("chartiq/js/thirdparty/html2canvas.min.js").then(() => {
            fullChart2PNG(stx, params, cb);
        });
    };
})();

export default MultiChartExample;
