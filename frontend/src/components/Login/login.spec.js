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
  it("should include inputs for login", () => {
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
  });
});