import React from "react";
import { shallow } from "enzyme";
import Login from "./login";
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

describe("Login", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Login />)));

  it("Login should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Login should include h4", () => {
    const container = wrapper.find("h4");
    expect(container.length).toEqual(1);
  });

  it("Login should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(1);
  });

  it("should have a form", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should include inputs for login", () => {
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
  });

  it("should include buttons for submit and register", () => {
    expect(wrapper.find("Button#submit").length).toEqual(1);
    expect(wrapper.find("Button#register").length).toEqual(1);
  });

  it("render submit button with custom text", () => {
    const button = wrapper.find("Button#submit");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Submit");
  });

  it("render register button with custom text", () => {
    const button = wrapper.find("Button#register");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Register");
  });
});
