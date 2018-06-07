import React from 'react';
import { Motion, spring } from 'react-motion';

export default ({ open }) => {
	console.log(open)
	return (
		<Motion defaultStyle={{ x: 1 }} style={{ x: open ? spring(100) : spring(1) }}>
			{ ({ x }) => (
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 ${1 / x * -d57} 636 57`}>
						<rect style={{ fill: 'black' }} x="556" width="25" height="57"/>
						<polygon style={{ fill: 'black' }} points="480.71 57 490.88 28 491.19 28 501.03 57 525.13 57 504.01 0 478.54 0 457.18 57 480.71 57"/>
						<rect style={{ fill: 'black' }} x="403" width="23" height="57"/>
						<polygon style={{ fill: 'black' }} points="354 57 354 38 354.02 38 365.92 57 390.27 57 355.13 0 330 0 330 57 354 57"/>
						<rect style={{ fill: 'black' }} x="284" width="25" height="57"/>
						<polygon style={{ fill: 'black' }} points="230.21 57 238.36 33 239 33 239 57 262 57 262 0 226.97 0 208.8 57 230.21 57"/>
						<polygon style={{ fill: 'black' }} points="164 57 164 34 163.84 34 171.8 57 194.45 57 175.24 0 140 0 140 57 164 57"/>
						<rect style={{ fill: 'black' }} x="94" width="24" height="57"/>
						<rect style={{ fill: 'black' }} width="25" height="57"/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 ${1 / x * 57} 636 56`}>
						<polygon style={{ fill: 'black' }} points="501.03 0 505.43 13 476.16 13 480.71 0 457.18 0 435.82 56 460.82 56 469.68 31 511.92 31 520.47 56 546.25 56 525.13 0 501.03 0"/>
						<rect style={{ fill: 'black' }} x="330" width="24" height="56"/>
						<polygon style={{ fill: 'black' }} points="403 0 403 19 402.28 19 390.27 0 365.92 0 401.01 56 426 56 426 0 403 0"/>
						<rect style={{ fill: 'black' }} x="284" width="25" height="56"/>
						<rect style={{ fill: 'black' }} x="140" width="24" height="56"/>
						<rect style={{ fill: 'black' }} x="239" width="23" height="56"/>
						<polygon style={{ fill: 'black' }} points="208.8 0 201.97 21 201.66 21 194.45 0 171.8 0 191.53 56 210.68 56 230.21 0 208.8 0"/>
						<rect style={{ fill: 'black' }} x="94" width="24" height="56"/>
						<polygon style={{ fill: 'black' }} points="25 0 0 0 0 56 80 56 80 35 25 35 25 0"/>
						<polygon style={{ fill: 'black' }} points="581 0 556 0 556 56 636 56 636 35 581 35 581 0"/>
					</svg>
				</div>
			)}
		</Motion>
	)
}
