/* eslint-disable max-len */
import type { PostProcessorModule } from "i18next";

const displayNamesPostProcessor: PostProcessorModule = {
  type: "postProcessor",
  name: "displayNames",

  process: function (value, key, options, translator) {
    // console.log("DisplayNames post-processor called with:", {
    //   value,
    //   key,
    //   options,
    //   translator
    // });
    if (!Intl.DisplayNames) {
      console.warn("Intl.DisplayNames is not supported in this environment.");
      return value;
    }

    const {
      type = "region",
      locale = translator.language,
      ...displayNamesOptions
    } = options;

    try {
      const displayNames = new Intl.DisplayNames(locale, {
        type: (type as Intl.DisplayNamesOptions["type"]),
        ...displayNamesOptions
      });
      return displayNames.of(value) || value;
    } catch (error) {
      console.error("Error using Intl.DisplayNames:", error);
      return value;
    }
  }
};

export default displayNamesPostProcessor;
