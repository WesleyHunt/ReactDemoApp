import React from 'react';
import renderer from 'react-test-renderer';
import OwnershipSliderCalculator, {calculateOwnership} from './OwnershipSliderCalculator'


test('Component UI snapshot with props', () => {
    const component = renderer
    .create(<OwnershipSliderCalculator rent={2400} initialMin={1200} initialMax={4000} monthlyMax={800} yearsMax={5}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});


test('OwnershipCalculations do not fail/crash with various inputs', () => {
    expect(calculateOwnership(null, null, null)).toStrictEqual(expect.anything())
    expect(calculateOwnership(null, 100, null)).toStrictEqual(expect.anything())
    expect(calculateOwnership(null, "helloworld", null)).toStrictEqual(expect.anything())
    expect(calculateOwnership(1,2,3)).toStrictEqual(expect.anything())
    expect(calculateOwnership('1', '2', '3')).toStrictEqual(expect.anything())
    expect(calculateOwnership("hellow", "helloworld","world")).toStrictEqual(expect.anything())
});

    /**redundant check: function calculateOwnership (initialInvestment, monthlyInvestment, monthsRenting) => {
    return initialInvestment + (monthlyInvestment * monthsRenting)
    return 1500 + (100 * yearsRenting*12)
    return 1500 + (100 * 1*12) = 2700
    **/
test('OwnershipCalculations produces correct value', () => {
    expect(calculateOwnership(1500,100,1)).toStrictEqual(2700)
});



