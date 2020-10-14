import React from "react";
import { shallow } from "enzyme";
import ViewProfile from "./viewProfile";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ViewProfile", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<ViewProfile />)));

  it("ViewProfile should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("ViewProfile should include container", () => {
    const container = wrapper.find("Container");
    expect(container.length).toEqual(1);
  });

  it("ViewProfile should include image", () => {
    const container = wrapper.find("Image");
    expect(container.length).toEqual(1);
  });

  it("ViewProfile should include 31 labels", () => {
    expect(wrapper.find("label").length).toEqual(29);
  });

  it("ViewProfile should include 6 h5 tags", () => {
    expect(wrapper.find("h5").length).toEqual(6);
  });

  it("ViewProfile should include 11 h6 tags", () => {
    expect(wrapper.find("h6").length).toEqual(11);
  });

  it("should include labels for personal details, education, and experience", () => {
    expect(wrapper.find("label#firstname").length).toEqual(1);
    expect(wrapper.find("label#lastname").length).toEqual(1);
    expect(wrapper.find("label#position").length).toEqual(1);
    expect(wrapper.find("label#aboutMe").length).toEqual(1);
    expect(wrapper.find("label#school").length).toEqual(1);
    expect(wrapper.find("label#degree").length).toEqual(1);
    expect(wrapper.find("label#major").length).toEqual(1);
    expect(wrapper.find("label#eduStartDate").length).toEqual(1);
    expect(wrapper.find("label#eduEndDate").length).toEqual(1);
    expect(wrapper.find("label#gpa").length).toEqual(1);
    expect(wrapper.find("label#title").length).toEqual(1);
    expect(wrapper.find("label#company").length).toEqual(1);
    expect(wrapper.find("label#location").length).toEqual(1);
    expect(wrapper.find("label#expStartDate").length).toEqual(1);
    expect(wrapper.find("label#expEndDate").length).toEqual(1);
  });

  it("should include buttons for send and edit profile", () => {
    expect(wrapper.find("Button#Send").length).toEqual(1);
    expect(wrapper.find("Button#Edit").length).toEqual(1);
  });

  it("render Send button with custom text", () => {
    const button = wrapper.find("Button#Send");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Send");
  });

  it("render Edit button with custom text", () => {
    const button = wrapper.find("Button#Edit");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Edit");
  });
});
