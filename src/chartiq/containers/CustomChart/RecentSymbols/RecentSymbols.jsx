import React from "react";

//import './RecentSymbols.css';

/**
 * Custom component that adds a recent symbols tab to the ChartIq symbol search web component
 *
 * @export
 * @class RecentSymbols
 * @extends {React.Component}
 */
export default class RecentSymbols extends React.Component {
	constructor(props) {
		super(props);

		this.el = React.createRef();
		this.getRecentSymbols = props.getRecentSymbols;
		this.connectCount = props.connectCount || 1;

		this.state = {};
	}

	componentDidMount() {
		const self = this;
		const el = this.el.current;

		lookupAvailable(createRecentTab);

		function lookupAvailable(cb) {
			let cnt = 0;
			const callback = function (mutationsList, observer) {
				for (let { target } of mutationsList) {
					if (target.nodeName.toLowerCase() === "cq-lookup") {
						cnt += 1;
						if (cnt === self.connectCount) observer.disconnect(); // found all elements
						cb(target.parentElement);
					}
				}
			};
			const observer = new MutationObserver(callback);
			const config = { attributes: false, childList: true, subtree: true };
			observer.observe(el, config);
		}

		function createRecentTab(el) {
			const qs = el.querySelector.bind(el);
			const lookupComponent = qs("cq-lookup");
			const input = qs("cq-lookup-input input");
			const lookupFilters = qs("cq-lookup-filters");
			const allTabs = lookupFilters.querySelector("cq-filter");
			let recentTab;

			let init = false;

			input.addEventListener("focus", () => {
				const hasRecentTab = /recent/i.test(lookupFilters.textContent);

				if (!hasRecentTab) {
					recentTab = document.createElement("cq-filter");
					recentTab.innerHTML = "RECENT";
					lookupFilters.insertBefore(recentTab, allTabs);
				}

				recentTab.addEventListener("click", showRecent);

				showRecent();

				if (init) return;
				input.addEventListener("keyup", handleChange);
				input.addEventListener("input", handleChange);

				init = true;
			});

			function handleChange() {
				if (!input.value) {
					showRecent();
				} else {
					unsetRecent();
				}
			}

			function showRecent() {
				lookupFilters
					.querySelectorAll("cq-filter")
					.forEach((tab) => activate(tab, false));
				activate(recentTab);

				self
					.getRecentSymbols()
					.then((list) =>
						Object.values(list).map(({ symbol, name, exchDisp }) => ({
							display: [symbol, name, exchDisp],
							data: { symbol, name, exchDisp }
						}))
					)
					.then((list) => {
						lookupComponent.resultList.empty();
						lookupComponent.results(list);
					});
			}

			function unsetRecent() {
				if (recentTab.classList.contains("true")) {
					activate(recentTab, false);
					activate(allTabs);
				}
			}

			function activate(el, value = true) {
				el.classList[value ? "add" : "remove"]("true");
			}
		}
	}

	render() {
		return <span ref={this.el}>{this.props.children}</span>;
	}
}
