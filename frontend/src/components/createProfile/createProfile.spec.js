import React from "react";
import { shallow } from "enzyme";
import CreateProfile from "./createProfile";
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

describe("CreateProfile", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<CreateProfile />)));

  it("should include forms", () => {
    expect(wrapper.find("form.profile").exists()).toBe(true);
  });

  it("CreateProfile should include 15 inputs", () => {
    expect(wrapper.find("input").length).toEqual(15);
  });

  it("should include inputs for personal details, education, and experience", () => {
    expect(wrapper.find("input#firstName").length).toEqual(1);
    expect(wrapper.find("input#lastName").length).toEqual(1);
    expect(wrapper.find("input#position").length).toEqual(1);
    expect(wrapper.find("input#aboutMe").length).toEqual(1);
    expect(wrapper.find("input#school").length).toEqual(1);
    expect(wrapper.find("input#degree").length).toEqual(1);
    expect(wrapper.find("input#major").length).toEqual(1);
    expect(wrapper.find("input#eduStartDate").length).toEqual(1);
    expect(wrapper.find("input#eduEndDate").length).toEqual(1);
    expect(wrapper.find("input#gpa").length).toEqual(1);
    expect(wrapper.find("input#title").length).toEqual(1);
    expect(wrapper.find("input#company").length).toEqual(1);
    expect(wrapper.find("input#location").length).toEqual(1);
    expect(wrapper.find("input#expStartDate").length).toEqual(1);
    expect(wrapper.find("input#expEndDate").length).toEqual(1);
  });

  it("update input forms ", () => {
    const firstNameInput = simulateChangeOnInput(wrapper, "#firstName", "John");
    const lastNameInput = simulateChangeOnInput(wrapper, "#lastName", "Doe");
    const positionInput = simulateChangeOnInput(wrapper, "#position", "Worker");
    const aboutMeInput = simulateChangeOnInput(wrapper, "#aboutMe", "Good");
    const schoolInput = simulateChangeOnInput(
      wrapper,
      "#school",
      "Drexel University"
    );
    const degreeInput = simulateChangeOnInput(wrapper, "#degree", "BS");
    const majorInput = simulateChangeOnInput(wrapper, "#major", "Science");
    const eduStartDateInput = simulateChangeOnInput(
      wrapper,
      "#eduStartDate",
      "2020-09"
    );
    const eduEndDateInput = simulateChangeOnInput(
      wrapper,
      "#eduEndDate",
      "2020-09"
    );
    const gpaInput = simulateChangeOnInput(wrapper, "#gpa", "3.50");
    const titleInput = simulateChangeOnInput(wrapper, "#title", "Intern");
    const companyInput = simulateChangeOnInput(wrapper, "#company", "DXC");
    const locationInput = simulateChangeOnInput(
      wrapper,
      "#location",
      "Philadelphia"
    );
    const expStartDateInput = simulateChangeOnInput(
      wrapper,
      "#expStartDate",
      "2020-09"
    );
    const expEndDateInput = simulateChangeOnInput(
      wrapper,
      "#expEndDate",
      "2020-09"
    );

    expect(firstNameInput.props().value).toEqual("John");
    expect(lastNameInput.props().value).toEqual("Doe");
    expect(positionInput.props().value).toEqual("Worker");
    expect(aboutMeInput.props().value).toEqual("Good");
    expect(schoolInput.props().value).toEqual("Drexel University");
    expect(degreeInput.props().value).toEqual("BS");
    expect(majorInput.props().value).toEqual("Science");
    expect(eduStartDateInput.props().value).toEqual("2020-09");
    expect(eduEndDateInput.props().value).toEqual("2020-09");
    expect(gpaInput.props().value).toEqual("3.50");
    expect(titleInput.props().value).toEqual("Intern");
    expect(companyInput.props().value).toEqual("DXC");
    expect(locationInput.props().value).toEqual("Philadelphia");
    expect(expStartDateInput.props().value).toEqual("2020-09");
    expect(expEndDateInput.props().value).toEqual("2020-09");
  });

  it("should include buttons for adding edu and exp", () => {
    const eduButton = wrapper.find("Button#addEducationButton");
    const expButton = wrapper.find("Button#addExperienceButton");

    expect(eduButton.length).toEqual(1);
    expect(expButton.length).toEqual(1);

    expect(eduButton.text()).toEqual("Add Education");
    expect(expButton.text()).toEqual("Add Experience");
  });
});
