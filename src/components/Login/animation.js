import { TweenMax } from 'gsap'

const duration = 0.5

export default {
	show(target, cb) {
		return TweenMax
			.from(target, duration, {
				opacity: 0,
				transformY: 30,
				onComplete() {
					cb()
				},
				ease: 'Power2'
			})
	},
	hide(target, cb) {
		return TweenMax
			.to(target, duration, {
				opacity: 0,
				transformY: 30,
				onComplete() {
					cb()
				},
				ease: 'Power2'
			})
	}
}