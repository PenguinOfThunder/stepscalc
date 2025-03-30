/* eslint-disable max-len */
export default {
  type: "postProcessor",
  name: "displayNames",

  process: function (value, key, options, translator) {
    console.log("DisplayNames post-processor called with:", {
      value,
      key,
      options,
      translator
    });
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
        type,
        ...displayNamesOptions
      });
      return displayNames.of(value) || value;
    } catch (error) {
      console.error("Error using Intl.DisplayNames:", error);
      return value;
    }
  }
};
