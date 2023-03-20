import Validate from './validate'

test('Verify passing undefined & null to isNullish returns true', () => {
    expect(Validate.isNullish(undefined)).toBe(true)
    expect(Validate.isNullish(null)).toBe(true)
})

test('Verify passing non-undefined & non-null to isNullish returns false', () => {
    expect(Validate.isNullish("a")).toBe(false)
    expect(Validate.isNullish(323)).toBe(false)
    expect(Validate.isNullish({})).toBe(false)
    expect(Validate.isNullish([])).toBe(false)
})