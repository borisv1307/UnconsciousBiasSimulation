import React from "react";
import { shallow } from "enzyme";
import Register from "./register";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });
  return wrapper.find(inputSelector);
};

describe("Register", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Register />)));

  it("should have a form", () => {
    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("should include inputs for registration", () => {
    expect(wrapper.find("#firstName").length).toEqual(1);
    expect(wrapper.find("#lastName").length).toEqual(1);
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
    expect(wrapper.find("#registration_type").length).toEqual(1);
    expect(wrapper.find("#address").length).toEqual(1);
    expect(wrapper.find("#address2").length).toEqual(1);
    expect(wrapper.find("#city").length).toEqual(1);
    expect(wrapper.find("#state").length).toEqual(1);
    expect(wrapper.find("#zip").length).toEqual(1);
    expect(wrapper.find("#contact_number").length).toEqual(1);
  });

  it("should update input forms ", () => {
    const firstNameInput = simulateChangeOnInput(wrapper, "#firstName", "John");
    const lastNameInput = simulateChangeOnInput(wrapper, "#lastName", "Doe");
    const emailInput = simulateChangeOnInput(wrapper, "#email", "test@test.com");
    const passwordInput = simulateChangeOnInput(wrapper, "#password", "Test123!");
    const registrationTypeInput = simulateChangeOnInput(wrapper, "#registration_type", "Job Seeker");
    const address1Input = simulateChangeOnInput(wrapper, "#address", "1234 Test Street");
    const address2Input = simulateChangeOnInput(wrapper, "#address2", "Apartment 1");
    const cityInput = simulateChangeOnInput(wrapper, "#city", "Philadelphia");
    const stateInput = simulateChangeOnInput(wrapper, "#state", "Pennsylvania");
    const zipInput = simulateChangeOnInput(wrapper, "#zip", "00000");
    const phoneNumberInput = simulateChangeOnInput(wrapper, "#contact_number", "000000000");

    
    expect(firstNameInput.props().value).toEqual("John");
    expect(lastNameInput.props().value).toEqual("Doe");
    expect(emailInput.props().value).toEqual("test@test.com");
    expect(passwordInput.props().value).toEqual("Test123!");
    expect(registrationTypeInput.props().value).toEqual("Job Seeker");
    expect(address1Input.props().value).toEqual("1234 Test Street");
    expect(address2Input.props().value).toEqual("Apartment 1");
    expect(cityInput.props().value).toEqual("Philadelphia");
    expect(stateInput.props().value).toEqual("Pennsylvania");
    expect(zipInput.props().value).toEqual("00000");
    expect(phoneNumberInput.props().value).toEqual("000000000");
  });

  it("should insert address and number details in contact details when button is clicked", () => {
    const collectContactDetailsButton = wrapper.find("#collectContactDetailsButton")

    simulateChangeOnInput(wrapper, "#address", "1234 Test Street");
    simulateChangeOnInput(wrapper, "#address2", "Apartment 1");
    simulateChangeOnInput(wrapper, "#city", "Philadelphia");
    simulateChangeOnInput(wrapper, "#state", "Pennsylvania");
    simulateChangeOnInput(wrapper, "#zip", "00000");
    simulateChangeOnInput(wrapper, "#contact_number", "000000000");

    collectContactDetailsButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("contact_details")).toEqual([{"address": "1234 Test Street", "address2": "Apartment 1", "city": "Philadelphia", "state": "Pennsylvania", "zip": "00000", "contact_number": "000000000"}]);
  });

});
