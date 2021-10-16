const AnimatedWrapper = require("./AnimatedWrapper")
// @ponicode
describe("componentWillEnter", () => {
    let inst

    beforeEach(() => {
        inst = new AnimatedWrapper.TestComponent()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillEnter("return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.componentWillEnter(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onEnter", () => {
    let inst

    beforeEach(() => {
        inst = new AnimatedWrapper.TestComponent()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onEnter()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onExited", () => {
    let inst

    beforeEach(() => {
        inst = new AnimatedWrapper.TestComponent()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onExited()
        }
    
        expect(callFunction).not.toThrow()
    })
})
