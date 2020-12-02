import React from "react";
import { shallow } from "enzyme";
import EmailValidation from "./EmailValidation";
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

describe("EmailValidation", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<EmailValidation />)));

  it("EmailValidation should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("EmailValidation should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(2);
  });

  it("should have a form", () => {
    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("should include inputs for login", () => {
    expect(wrapper.find("#otp").length).toEqual(1);

  });

  it("should include buttons for submit and register", () => {
    expect(wrapper.find("Button#validate").length).toEqual(1);
    expect(wrapper.find("Button#cancel").length).toEqual(1);
  });

  it("render submit button with custom text", () => {
    const button = wrapper.find("Button#validate");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Validate OTP");
  });

  it("render register button with custom text", () => {
    const button = wrapper.find("Button#cancel");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Cancel");
  });

  describe("Alerts", () => {
    it("should show an error message when form input is incomplete", () => {
      wrapper.setState({ otp: ""}, () => {
        wrapper.find("#validate").simulate("click"),
          () => {
            //submit form
            wrapper.update();
          };

        expect(wrapper.state("error_message")).toEqual(
          "Field/s cannot be blank"
        );
        expect(wrapper.state("error_show")).toEqual(true);
      });
    });
  });
});
