import NavBar from "./NavBar.vue"
import {mount} from "@vue/test-utils";
import { expect, test } from "vitest";

const wrapper = mount(NavBar);

it("testing NavBar render", async () => {
    expect(wrapper.exists()).toBe(true);
})

it("toggles menu when menu icon is clicked", async () => {
    await wrapper.find(".bi.bi-filter-left").trigger("click");
    expect(wrapper.vm.open).toBe(true);

    await wrapper.find(".bi.bi-x").trigger("click");
    expect(wrapper.vm.open).toBe(false);
})

it("renders links with correct href", async () => {
    const links = wrapper.findAll("a");
    expect(links.length).toBe(2);

    expect(links[0].attributes("href")).toBe("https://github.com/enzoggqs");
    expect(links[0].text()).toBe("Github");

    expect(links[1].attributes("href")).toBe("https://www.linkedin.com/in/enzoggqs/");
    expect(links[1].text()).toBe("LinkedIn");
})

it("displays menu when open is true", async () => {
    await wrapper.setProps({ open: true });
    expect(wrapper.find("ul").isVisible()).toBe(true);
});
