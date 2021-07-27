import React from "react";
import { CIQ } from "chartiq/js/chartiq";

/**
 * The Hello World component creates a basic chart from a built-in static data source. The chart
 * does not have a user interface.
 *
 * @export
 * @class HelloWorld
 * @extends {React.Component}
 */
export default class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
	}

	componentDidMount() {
		const container = this.container.current;

		const stx = new CIQ.ChartEngine({ container });

		stx.loadChart("SPY", {
			masterData: this.getMasterData(),
			periodicity: {
				period: 1,
				interval: 5,
				timeUnit: "minute"
			}
		});
	}

	getMasterData() {
		const masterData = [
			{
				Date: "20200331144000000",
				Open: 156.64,
				High: 156.66,
				Low: 156.57,
				Close: 156.59,
				Volume: 932912
			},
			{
				Date: "20200331145000000",
				Open: 156.58,
				High: 156.62,
				Low: 156.57,
				Close: 156.61,
				Volume: 700952
			},
			{
				Date: "20200331145500000",
				Open: 156.59,
				High: 156.6,
				Low: 156.55,
				Close: 156.58,
				Volume: 1084428
			},
			{
				Date: "20200331150000000",
				Open: 156.57,
				High: 156.58,
				Low: 156.53,
				Close: 156.55,
				Volume: 916684
			},
			{
				Date: "20200331150500000",
				Open: 156.54,
				High: 156.57,
				Low: 156.52,
				Close: 156.55,
				Volume: 1360390
			},
			{
				Date: "20200331151000000",
				Open: 156.56,
				High: 156.6,
				Low: 156.54,
				Close: 156.58,
				Volume: 2037170
			},
			{
				Date: "20200331151500000",
				Open: 156.55,
				High: 156.62,
				Low: 156.54,
				Close: 156.6,
				Volume: 4280833
			},
			{
				Date: "20200331152000000",
				Open: 156.61,
				High: 156.62,
				Low: 156.54,
				Close: 156.57,
				Volume: 3348274
			},
			{
				Date: "20200331152500000",
				Open: 156.59,
				High: 156.62,
				Low: 156.52,
				Close: 156.54,
				Volume: 932912
			},
			{
				Date: "20200331153000000",
				Open: 156.56,
				High: 156.57,
				Low: 156.5,
				Close: 156.52,
				Volume: 700952
			},
			{
				Date: "20200331153500000",
				Open: 156.51,
				High: 156.56,
				Low: 156.5,
				Close: 156.54,
				Volume: 1084428
			},
			{
				Date: "20200331154000000",
				Open: 156.52,
				High: 156.56,
				Low: 156.51,
				Close: 156.55,
				Volume: 916684
			},
			{
				Date: "20200331154500000",
				Open: 156.56,
				High: 156.57,
				Low: 156.5,
				Close: 156.53,
				Volume: 1360390
			},
			{
				Date: "20200331155000000",
				Open: 156.52,
				High: 156.53,
				Low: 156.49,
				Close: 156.5,
				Volume: 2037170
			},
			{
				Date: "20200331155500000",
				Open: 156.51,
				High: 156.52,
				Low: 156.46,
				Close: 156.48,
				Volume: 4280833
			},
			{
				Date: "20200331160000000",
				Open: 156.49,
				High: 156.48,
				Low: 156.44,
				Close: 156.47,
				Volume: 3348274
			},
			{
				Date: "20200401093000000",
				Open: 156.41,
				High: 156.48,
				Low: 156.39,
				Close: 156.46,
				Volume: 1869466
			},
			{
				Date: "20200401093500000",
				Open: 156.44,
				High: 156.53,
				Low: 156.4,
				Close: 156.49,
				Volume: 2937883
			},
			{
				Date: "20200401094000000",
				Open: 156.48,
				High: 156.54,
				Low: 156.37,
				Close: 156.43,
				Volume: 2277682
			},
			{
				Date: "20200401094500000",
				Open: 156.47,
				High: 156.55,
				Low: 156.45,
				Close: 156.51,
				Volume: 1714687
			},
			{
				Date: "20200401095000000",
				Open: 156.49,
				High: 156.58,
				Low: 156.48,
				Close: 156.54,
				Volume: 1902583
			},
			{
				Date: "20200401095500000",
				Open: 156.54,
				High: 156.59,
				Low: 156.5,
				Close: 156.56,
				Volume: 1325148
			},
			{
				Date: "20200401100000000",
				Open: 156.56,
				High: 156.6,
				Low: 156.5,
				Close: 156.53,
				Volume: 2005588
			},
			{
				Date: "20200401100500000",
				Open: 156.52,
				High: 156.54,
				Low: 156.42,
				Close: 156.43,
				Volume: 1277880
			},
			{
				Date: "20200401101000000",
				Open: 156.44,
				High: 156.46,
				Low: 156.36,
				Close: 156.37,
				Volume: 1158301
			},
			{
				Date: "20200401101500000",
				Open: 156.38,
				High: 156.39,
				Low: 156.26,
				Close: 156.28,
				Volume: 1987415
			},
			{
				Date: "20200401102000000",
				Open: 156.26,
				High: 156.33,
				Low: 156.22,
				Close: 156.32,
				Volume: 1512742
			},
			{
				Date: "20200401102500000",
				Open: 156.31,
				High: 156.4,
				Low: 156.31,
				Close: 156.39,
				Volume: 871592
			},
			{
				Date: "20200401103000000",
				Open: 156.38,
				High: 156.43,
				Low: 156.35,
				Close: 156.4,
				Volume: 1132109
			},
			{
				Date: "20200401103500000",
				Open: 156.4,
				High: 156.44,
				Low: 156.37,
				Close: 156.41,
				Volume: 725521
			},
			{
				Date: "20200401104000000",
				Open: 156.41,
				High: 156.5,
				Low: 156.41,
				Close: 156.48,
				Volume: 704072
			},
			{
				Date: "20200401104500000",
				Open: 156.48,
				High: 156.5,
				Low: 156.42,
				Close: 156.46,
				Volume: 844084
			},
			{
				Date: "20200401105000000",
				Open: 156.47,
				High: 156.47,
				Low: 156.42,
				Close: 156.45,
				Volume: 392122
			},
			{
				Date: "20200401105500000",
				Open: 156.45,
				High: 156.47,
				Low: 156.38,
				Close: 156.41,
				Volume: 544729
			},
			{
				Date: "20200401110000000",
				Open: 156.43,
				High: 156.47,
				Low: 156.41,
				Close: 156.44,
				Volume: 660383
			},
			{
				Date: "20200401110500000",
				Open: 156.43,
				High: 156.47,
				Low: 156.4,
				Close: 156.41,
				Volume: 640177
			},
			{
				Date: "20200401111000000",
				Open: 156.41,
				High: 156.44,
				Low: 156.35,
				Close: 156.39,
				Volume: 845668
			},
			{
				Date: "20200401111500000",
				Open: 156.38,
				High: 156.41,
				Low: 156.37,
				Close: 156.39,
				Volume: 503347
			},
			{
				Date: "20200401112000000",
				Open: 156.39,
				High: 156.43,
				Low: 156.38,
				Close: 156.41,
				Volume: 360929
			},
			{
				Date: "20200401112500000",
				Open: 156.4,
				High: 156.42,
				Low: 156.37,
				Close: 156.38,
				Volume: 749554
			},
			{
				Date: "20200401113000000",
				Open: 156.39,
				High: 156.44,
				Low: 156.38,
				Close: 156.42,
				Volume: 723857
			},
			{
				Date: "20200401113500000",
				Open: 156.4,
				High: 156.45,
				Low: 156.4,
				Close: 156.44,
				Volume: 455561
			},
			{
				Date: "20200401114000000",
				Open: 156.43,
				High: 156.48,
				Low: 156.42,
				Close: 156.45,
				Volume: 670704
			},
			{
				Date: "20200401114500000",
				Open: 156.44,
				High: 156.54,
				Low: 156.44,
				Close: 156.5,
				Volume: 827725
			},
			{
				Date: "20200401115000000",
				Open: 156.51,
				High: 156.55,
				Low: 156.48,
				Close: 156.53,
				Volume: 828780
			},
			{
				Date: "20200401115500000",
				Open: 156.53,
				High: 156.55,
				Low: 156.48,
				Close: 156.49,
				Volume: 687357
			},
			{
				Date: "20200401120000000",
				Open: 156.48,
				High: 156.52,
				Low: 156.48,
				Close: 156.51,
				Volume: 343617
			},
			{
				Date: "20200401120500000",
				Open: 156.5,
				High: 156.58,
				Low: 156.5,
				Close: 156.57,
				Volume: 444181
			},
			{
				Date: "20200401121000000",
				Open: 156.57,
				High: 156.61,
				Low: 156.56,
				Close: 156.57,
				Volume: 932850
			},
			{
				Date: "20200401121500000",
				Open: 156.58,
				High: 156.63,
				Low: 156.56,
				Close: 156.61,
				Volume: 622879
			},
			{
				Date: "20200401122000000",
				Open: 156.61,
				High: 156.64,
				Low: 156.54,
				Close: 156.56,
				Volume: 417197
			},
			{
				Date: "20200401122500000",
				Open: 156.57,
				High: 156.6,
				Low: 156.54,
				Close: 156.56,
				Volume: 524792
			},
			{
				Date: "20200401123000000",
				Open: 156.57,
				High: 156.63,
				Low: 156.56,
				Close: 156.63,
				Volume: 547832
			},
			{
				Date: "20200401123500000",
				Open: 156.63,
				High: 156.69,
				Low: 156.62,
				Close: 156.65,
				Volume: 1033940
			},
			{
				Date: "20200401124000000",
				Open: 156.65,
				High: 156.66,
				Low: 156.59,
				Close: 156.6,
				Volume: 666020
			},
			{
				Date: "20200401124500000",
				Open: 156.6,
				High: 156.63,
				Low: 156.52,
				Close: 156.54,
				Volume: 886571
			},
			{
				Date: "20200401125000000",
				Open: 156.54,
				High: 156.59,
				Low: 156.53,
				Close: 156.57,
				Volume: 409824
			},
			{
				Date: "20200401125500000",
				Open: 156.57,
				High: 156.57,
				Low: 156.52,
				Close: 156.53,
				Volume: 490971
			},
			{
				Date: "20200401130000000",
				Open: 156.53,
				High: 156.62,
				Low: 156.53,
				Close: 156.62,
				Volume: 618202
			},
			{
				Date: "20200401130500000",
				Open: 156.62,
				High: 156.63,
				Low: 156.56,
				Close: 156.56,
				Volume: 232977
			},
			{
				Date: "20200401131000000",
				Open: 156.56,
				High: 156.58,
				Low: 156.52,
				Close: 156.52,
				Volume: 569834
			},
			{
				Date: "20200401131500000",
				Open: 156.53,
				High: 156.55,
				Low: 156.5,
				Close: 156.54,
				Volume: 526717
			},
			{
				Date: "20200401132000000",
				Open: 156.54,
				High: 156.54,
				Low: 156.48,
				Close: 156.52,
				Volume: 587983
			},
			{
				Date: "20200401132500000",
				Open: 156.52,
				High: 156.52,
				Low: 156.46,
				Close: 156.46,
				Volume: 683988
			},
			{
				Date: "20200401133000000",
				Open: 156.46,
				High: 156.48,
				Low: 156.44,
				Close: 156.44,
				Volume: 505235
			},
			{
				Date: "20200401133500000",
				Open: 156.45,
				High: 156.46,
				Low: 156.41,
				Close: 156.44,
				Volume: 760274
			},
			{
				Date: "20200401134000000",
				Open: 156.45,
				High: 156.45,
				Low: 156.41,
				Close: 156.42,
				Volume: 428196
			},
			{
				Date: "20200401134500000",
				Open: 156.43,
				High: 156.49,
				Low: 156.42,
				Close: 156.49,
				Volume: 372145
			},
			{
				Date: "20200401135000000",
				Open: 156.49,
				High: 156.55,
				Low: 156.42,
				Close: 156.42,
				Volume: 493463
			},
			{
				Date: "20200401135500000",
				Open: 156.42,
				High: 156.46,
				Low: 156.37,
				Close: 156.38,
				Volume: 763911
			},
			{
				Date: "20200401140000000",
				Open: 156.38,
				High: 156.44,
				Low: 156.38,
				Close: 156.43,
				Volume: 478714
			},
			{
				Date: "20200401140500000",
				Open: 156.43,
				High: 156.48,
				Low: 156.4,
				Close: 156.47,
				Volume: 347221
			},
			{
				Date: "20200401141000000",
				Open: 156.46,
				High: 156.48,
				Low: 156.44,
				Close: 156.45,
				Volume: 527388
			},
			{
				Date: "20200401141500000",
				Open: 156.46,
				High: 156.47,
				Low: 156.39,
				Close: 156.46,
				Volume: 1254489
			},
			{
				Date: "20200401142000000",
				Open: 156.47,
				High: 156.52,
				Low: 156.43,
				Close: 156.5,
				Volume: 588877
			},
			{
				Date: "20200401142500000",
				Open: 156.49,
				High: 156.5,
				Low: 156.45,
				Close: 156.46,
				Volume: 391738
			},
			{
				Date: "20200401143000000",
				Open: 156.46,
				High: 156.5,
				Low: 156.43,
				Close: 156.46,
				Volume: 835468
			},
			{
				Date: "20200401143500000",
				Open: 156.46,
				High: 156.51,
				Low: 156.45,
				Close: 156.48,
				Volume: 465308
			},
			{
				Date: "20200401144000000",
				Open: 156.48,
				High: 156.5,
				Low: 156.47,
				Close: 156.49,
				Volume: 389872
			},
			{
				Date: "20200401144500000",
				Open: 156.48,
				High: 156.53,
				Low: 156.48,
				Close: 156.5,
				Volume: 530820
			},
			{
				Date: "20200401145000000",
				Open: 156.5,
				High: 156.53,
				Low: 156.48,
				Close: 156.53,
				Volume: 554269
			},
			{
				Date: "20200401145500000",
				Open: 156.53,
				High: 156.57,
				Low: 156.52,
				Close: 156.56,
				Volume: 622473
			},
			{
				Date: "20200401150000000",
				Open: 156.57,
				High: 156.59,
				Low: 156.53,
				Close: 156.59,
				Volume: 593592
			},
			{
				Date: "20200401150500000",
				Open: 156.59,
				High: 156.61,
				Low: 156.56,
				Close: 156.58,
				Volume: 1089712
			},
			{
				Date: "20200401151000000",
				Open: 156.59,
				High: 156.59,
				Low: 156.55,
				Close: 156.57,
				Volume: 634702
			},
			{
				Date: "20200401151500000",
				Open: 156.57,
				High: 156.64,
				Low: 156.57,
				Close: 156.6,
				Volume: 1206417
			},
			{
				Date: "20200401152000000",
				Open: 156.6,
				High: 156.61,
				Low: 156.58,
				Close: 156.6,
				Volume: 641636
			},
			{
				Date: "20200401152500000",
				Open: 156.59,
				High: 156.6,
				Low: 156.54,
				Close: 156.55,
				Volume: 873698
			},
			{
				Date: "20200401153000000",
				Open: 156.55,
				High: 156.64,
				Low: 156.55,
				Close: 156.59,
				Volume: 1318720
			},
			{
				Date: "20200401153500000",
				Open: 156.6,
				High: 156.68,
				Low: 156.59,
				Close: 156.68,
				Volume: 1520610
			},
			{
				Date: "20200401154000000",
				Open: 156.68,
				High: 156.74,
				Low: 156.67,
				Close: 156.74,
				Volume: 1678678
			},
			{
				Date: "20200401154500000",
				Open: 156.74,
				High: 156.8,
				Low: 156.73,
				Close: 156.76,
				Volume: 2854531
			},
			{
				Date: "20200401155000000",
				Open: 156.75,
				High: 156.79,
				Low: 156.71,
				Close: 156.72,
				Volume: 2984534
			},
			{
				Date: "20200401155500000",
				Open: 156.71,
				High: 156.75,
				Low: 156.63,
				Close: 156.73,
				Volume: 7105595
			},
			{
				Date: "20200401160000000",
				Open: 156.73,
				High: 156.78,
				Low: 156.71,
				Close: 156.77,
				Volume: 3863507
			}
		];
		return masterData;
	}

	render() {
		return (
			<div style={{ margin: "20px" }}>
				<h2>Hello world static chart example</h2>
				<div
					ref={this.container}
					className="chartContainer"
					style={{
						width: "800px",
						height: "460px",
						position: "relative",
						border: "solid 1px #aaa"
					}}
				></div>
			</div>
		);
	}
}
