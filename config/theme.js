const colors = {
    LIGHBLUE: '#00AABE',
    BLUE: '#0073C8',
    BLACK: "#000",
    WHITE: "#FFF",
    SILVER: "#878580",
    TORCH_RED: "#F8262F",
    MISCHKA: "#E5E4E6",
    LIGHT_GRAY: "#D3D3D3"
  };
  
  const sizes = {
    font: 15,
    h1: 48,
    h2: 34,
    h3: 20,
    h4: 15,
    paragraph: 15,
    caption: 13,
    captionMedium: 12,
  };
  
  const fonts = {
    h1: {
      fontFamily: 'Rubik-Light',
      fontSize: sizes.h1,
      color: colors.black,
      letterSpacing: -0.6,
      lineHeight: 57,
    },
    h2: {
      fontFamily: 'Rubik-Light',
      fontSize: sizes.h2,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Rubik-Light',
      fontSize: sizes.h3,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h4: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.h4,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 18,
    },
    hello: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.h3,
      color: colors.LIGHBLUE,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray2: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray2,
      letterSpacing: 0,
      lineHeight: 22,
    },
    caption: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.caption,
      color: colors.black3,
      letterSpacing: 1.12,
      lineHeight: 15,
    },
    captionMedium: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.captionMedium,
      color: colors.black3,
      letterSpacing: 1.12,
      lineHeight: 14,
    },
    button: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.font,
      color: colors.white,
      letterSpacing: 0,
      lineHeight: 21,
    },
  };
  
  export {
    colors,
    sizes,
    fonts,
  };