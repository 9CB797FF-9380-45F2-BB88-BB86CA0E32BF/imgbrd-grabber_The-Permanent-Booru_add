// The Permanent Booru

/* Since this Booru is only accessible through anonymized overlay networks, it must be accompanied by Grabber's proxy settings.
 * If you are using the Tor Browser Bundle (https://www.torproject.org) on ​​Windows, go to Grabber->Preference->Proxy while Tor Browser is running and configure it as follows.
 * ☑ Use Proxy
 * ☐ Use system-wide proxy settings
 * Type: SOCKS v5
 * Host: 127.0.0.1
 * Port: 9150
 * User:
 * Password:
 * If you use i2p or lokinet, the contents of other proxy settings may vary.
*/

/*
 * site maps *
 * / -> main page
 * /posts/<pagenumber>/<and_keyword>?filter=<filter_keyword>&or=<or_keyword>&unless=<unless_keyword> -> search result
 * /user/pools/<pool_number> -> pool page
 * /tags -> tage list
 * /wall/ -> board
 * /comics/ -> comics, gallery
 * /upload/ -> upload page
 * /user/<user_number> -> user page
 * /user/message/new/?recipient=<user_number> -> send message
 * /.data//files/<last_3_character_of_sha256_hash>/<sha256_hash>.<file_ext> -> original file(Download)
 * /spine/?page=<page_number>&user=<user_number> -> log
 * /post/<postID> -> image select by post number
 * /post/md5/<image_md5> -> image select by md5
 * /post/sha256/<image_sha256> -> image select by sha256
 * /api/v1/posts -> Image List API(JSON), more info:https://github.com/Kycklingar/pbooru-downloader
 * /tombstone/ -> List of images removed from their original source sites (with reasons)
 * /dns/ -> Link to the artist's SNS or art posting site
*/

/* This booru sets the number of images per page as OPTION method instead of passing it as GET method.
 * So if you want to change the number of images per page, you need to change the cookie value in the source settings.
*/

// Sometimes comments on a line are taken from another model.js, but it is not clear what they are used for.

// -------- Typescript Type Narrowing Start --------

// Check if an object is an ITag interface
function isITagArr(obj: any): obj is ITag[]{
    return obj.every((i: any) => i.name);
}

// Check if an object is an String Array
function isStringArr(obj: any): obj is string[] {
    return obj.every((i: any) => typeof i === "string");
}

// Check if an object is an String
function isString(obj: any): obj is string {
    return typeof obj === "string";
}

// -------- Typescript Type Narrowing End --------


// -------- Static Map Start --------

// tag type name -> tag type ID
const TAG_NAME_TO_TTYPE_ID_MAP: Record<string, number> = {
    "none": 0,
    "rating": 1,
    "meta": 2,
    "medium": 3,
    "series": 4,
    "gender": 5,
    "species": 6,
    "creator": 7,
    "character": 8
};

// tag namespace -> tag type name
const TAG_NAME_TO_GRB_TTYPE_MAP: Record<string, string> = {
    "none": "general",
    "rating": "meta",
    "meta": "meta",
    "medium": "medium",
    "series": "copyright",
    "gender": "general",
    "species": "species",
    "creator": "artist",
    "character": "character"
};

// HTML entity -> Character
// about this map: https://html.spec.whatwg.org/multipage/named-characters.html
const html_entity_normal_character_maps: Record<string, string> = {
    "&#198;": "\u00C6", // &AElig
    "&#38;": "\u0026", // &AMP
    "&#193;": "\u00C1", // &Aacute
    "&#258;": "\u0102", // &Abreve;
    "&#194;": "\u00C2", // &Acirc
    "&#1040;": "\u0410", // &Acy;
    "&#120068;": "\uD835\uDD04", // &Afr;
    "&#192;": "\u00C0", // &Agrave
    "&#913;": "\u0391", // &Alpha;
    "&#256;": "\u0100", // &Amacr;
    "&#10835;": "\u2A53", // &And;
    "&#260;": "\u0104", // &Aogon;
    "&#120120;": "\uD835\uDD38", // &Aopf;
    "&#8289;": "\u2061", // &ApplyFunction;
    "&#197;": "\u00C5", // &Aring
    "&#119964;": "\uD835\uDC9C", // &Ascr;
    "&#8788;": "\u2254", // &Assign;
    "&#195;": "\u00C3", // &Atilde
    "&#196;": "\u00C4", // &Auml
    "&#8726;": "\u2216", // &Backslash;
    "&#10983;": "\u2AE7", // &Barv;
    "&#8966;": "\u2306", // &Barwed;
    "&#1041;": "\u0411", // &Bcy;
    "&#8757;": "\u2235", // &Because;
    "&#8492;": "\u212C", // &Bernoullis;
    "&#914;": "\u0392", // &Beta;
    "&#120069;": "\uD835\uDD05", // &Bfr;
    "&#120121;": "\uD835\uDD39", // &Bopf;
    "&#728;": "\u02D8", // &Breve;
    "&#8782;": "\u224E", // &Bumpeq;
    "&#1063;": "\u0427", // &CHcy;
    "&#169;": "\u00A9", // &COPY
    "&#262;": "\u0106", // &Cacute;
    "&#8914;": "\u22D2", // &Cap;
    "&#8517;": "\u2145", // &CapitalDifferentialD;
    "&#8493;": "\u212D", // &Cayleys;
    "&#268;": "\u010C", // &Ccaron;
    "&#199;": "\u00C7", // &Ccedil
    "&#264;": "\u0108", // &Ccirc;
    "&#8752;": "\u2230", // &Cconint;
    "&#266;": "\u010A", // &Cdot;
    "&#184;": "\u00B8", // &Cedilla;
    "&#183;": "\u00B7", // &CenterDot;
    "&#935;": "\u03A7", // &Chi;
    "&#8857;": "\u2299", // &CircleDot;
    "&#8854;": "\u2296", // &CircleMinus;
    "&#8853;": "\u2295", // &CirclePlus;
    "&#8855;": "\u2297", // &CircleTimes;
    "&#8754;": "\u2232", // &ClockwiseContourIntegral;
    "&#8221;": "\u201D", // &CloseCurlyDoubleQuote;
    "&#8217;": "\u2019", // &CloseCurlyQuote;
    "&#8759;": "\u2237", // &Colon;
    "&#10868;": "\u2A74", // &Colone;
    "&#8801;": "\u2261", // &Congruent;
    "&#8751;": "\u222F", // &Conint;
    "&#8750;": "\u222E", // &ContourIntegral;
    "&#8450;": "\u2102", // &Copf;
    "&#8720;": "\u2210", // &Coproduct;
    "&#8755;": "\u2233", // &CounterClockwiseContourIntegral;
    "&#10799;": "\u2A2F", // &Cross;
    "&#119966;": "\uD835\uDC9E", // &Cscr;
    "&#8915;": "\u22D3", // &Cup;
    "&#8781;": "\u224D", // &CupCap;
    "&#10513;": "\u2911", // &DDotrahd;
    "&#1026;": "\u0402", // &DJcy;
    "&#1029;": "\u0405", // &DScy;
    "&#1039;": "\u040F", // &DZcy;
    "&#8225;": "\u2021", // &Dagger;
    "&#8609;": "\u21A1", // &Darr;
    "&#10980;": "\u2AE4", // &Dashv;
    "&#270;": "\u010E", // &Dcaron;
    "&#1044;": "\u0414", // &Dcy;
    "&#8711;": "\u2207", // &Del;
    "&#916;": "\u0394", // &Delta;
    "&#120071;": "\uD835\uDD07", // &Dfr;
    "&#180;": "\u00B4", // &DiacriticalAcute;
    "&#729;": "\u02D9", // &DiacriticalDot;
    "&#733;": "\u02DD", // &DiacriticalDoubleAcute;
    "&#96;": "\u0060", // &DiacriticalGrave;
    "&#732;": "\u02DC", // &DiacriticalTilde;
    "&#8900;": "\u22C4", // &Diamond;
    "&#8518;": "\u2146", // &DifferentialD;
    "&#120123;": "\uD835\uDD3B", // &Dopf;
    "&#168;": "\u00A8", // &Dot;
    "&#8412;": "\u20DC", // &DotDot;
    "&#8784;": "\u2250", // &DotEqual;
    "&#8659;": "\u21D3", // &DoubleDownArrow;
    "&#8656;": "\u21D0", // &DoubleLeftArrow;
    "&#8660;": "\u21D4", // &DoubleLeftRightArrow;
    "&#10232;": "\u27F8", // &DoubleLongLeftArrow;
    "&#10234;": "\u27FA", // &DoubleLongLeftRightArrow;
    "&#10233;": "\u27F9", // &DoubleLongRightArrow;
    "&#8658;": "\u21D2", // &DoubleRightArrow;
    "&#8872;": "\u22A8", // &DoubleRightTee;
    "&#8657;": "\u21D1", // &DoubleUpArrow;
    "&#8661;": "\u21D5", // &DoubleUpDownArrow;
    "&#8741;": "\u2225", // &DoubleVerticalBar;
    "&#8595;": "\u2193", // &DownArrow;
    "&#10515;": "\u2913", // &DownArrowBar;
    "&#8693;": "\u21F5", // &DownArrowUpArrow;
    "&#785;": "\u0311", // &DownBreve;
    "&#10576;": "\u2950", // &DownLeftRightVector;
    "&#10590;": "\u295E", // &DownLeftTeeVector;
    "&#8637;": "\u21BD", // &DownLeftVector;
    "&#10582;": "\u2956", // &DownLeftVectorBar;
    "&#10591;": "\u295F", // &DownRightTeeVector;
    "&#8641;": "\u21C1", // &DownRightVector;
    "&#10583;": "\u2957", // &DownRightVectorBar;
    "&#8868;": "\u22A4", // &DownTee;
    "&#8615;": "\u21A7", // &DownTeeArrow;
    "&#119967;": "\uD835\uDC9F", // &Dscr;
    "&#272;": "\u0110", // &Dstrok;
    "&#330;": "\u014A", // &ENG;
    "&#208;": "\u00D0", // &ETH
    "&#201;": "\u00C9", // &Eacute
    "&#282;": "\u011A", // &Ecaron;
    "&#202;": "\u00CA", // &Ecirc
    "&#1069;": "\u042D", // &Ecy;
    "&#278;": "\u0116", // &Edot;
    "&#120072;": "\uD835\uDD08", // &Efr;
    "&#200;": "\u00C8", // &Egrave
    "&#8712;": "\u2208", // &Element;
    "&#274;": "\u0112", // &Emacr;
    "&#9723;": "\u25FB", // &EmptySmallSquare;
    "&#9643;": "\u25AB", // &EmptyVerySmallSquare;
    "&#280;": "\u0118", // &Eogon;
    "&#120124;": "\uD835\uDD3C", // &Eopf;
    "&#917;": "\u0395", // &Epsilon;
    "&#10869;": "\u2A75", // &Equal;
    "&#8770;": "\u2242", // &EqualTilde;
    "&#8652;": "\u21CC", // &Equilibrium;
    "&#8496;": "\u2130", // &Escr;
    "&#10867;": "\u2A73", // &Esim;
    "&#919;": "\u0397", // &Eta;
    "&#203;": "\u00CB", // &Euml
    "&#8707;": "\u2203", // &Exists;
    "&#8519;": "\u2147", // &ExponentialE;
    "&#1060;": "\u0424", // &Fcy;
    "&#120073;": "\uD835\uDD09", // &Ffr;
    "&#9724;": "\u25FC", // &FilledSmallSquare;
    "&#9642;": "\u25AA", // &FilledVerySmallSquare;
    "&#120125;": "\uD835\uDD3D", // &Fopf;
    "&#8704;": "\u2200", // &ForAll;
    "&#8497;": "\u2131", // &Fouriertrf;
    "&#1027;": "\u0403", // &GJcy;
    "&#62;": "\u003E", // &GT
    "&#915;": "\u0393", // &Gamma;
    "&#988;": "\u03DC", // &Gammad;
    "&#286;": "\u011E", // &Gbreve;
    "&#290;": "\u0122", // &Gcedil;
    "&#284;": "\u011C", // &Gcirc;
    "&#1043;": "\u0413", // &Gcy;
    "&#288;": "\u0120", // &Gdot;
    "&#120074;": "\uD835\uDD0A", // &Gfr;
    "&#8921;": "\u22D9", // &Gg;
    "&#120126;": "\uD835\uDD3E", // &Gopf;
    "&#8805;": "\u2265", // &GreaterEqual;
    "&#8923;": "\u22DB", // &GreaterEqualLess;
    "&#8807;": "\u2267", // &GreaterFullEqual;
    "&#10914;": "\u2AA2", // &GreaterGreater;
    "&#8823;": "\u2277", // &GreaterLess;
    "&#10878;": "\u2A7E", // &GreaterSlantEqual;
    "&#8819;": "\u2273", // &GreaterTilde;
    "&#119970;": "\uD835\uDCA2", // &Gscr;
    "&#8811;": "\u226B", // &Gt;
    "&#1066;": "\u042A", // &HARDcy;
    "&#711;": "\u02C7", // &Hacek;
    "&#94;": "\u005E", // &Hat;
    "&#292;": "\u0124", // &Hcirc;
    "&#8460;": "\u210C", // &Hfr;
    "&#8459;": "\u210B", // &HilbertSpace;
    "&#8461;": "\u210D", // &Hopf;
    "&#9472;": "\u2500", // &HorizontalLine;
    "&#294;": "\u0126", // &Hstrok;
    "&#8783;": "\u224F", // &HumpEqual;
    "&#1045;": "\u0415", // &IEcy;
    "&#306;": "\u0132", // &IJlig;
    "&#1025;": "\u0401", // &IOcy;
    "&#205;": "\u00CD", // &Iacute
    "&#206;": "\u00CE", // &Icirc
    "&#1048;": "\u0418", // &Icy;
    "&#304;": "\u0130", // &Idot;
    "&#8465;": "\u2111", // &Ifr;
    "&#204;": "\u00CC", // &Igrave
    "&#298;": "\u012A", // &Imacr;
    "&#8520;": "\u2148", // &ImaginaryI;
    "&#8748;": "\u222C", // &Int;
    "&#8747;": "\u222B", // &Integral;
    "&#8898;": "\u22C2", // &Intersection;
    "&#8291;": "\u2063", // &InvisibleComma;
    "&#8290;": "\u2062", // &InvisibleTimes;
    "&#302;": "\u012E", // &Iogon;
    "&#120128;": "\uD835\uDD40", // &Iopf;
    "&#921;": "\u0399", // &Iota;
    "&#8464;": "\u2110", // &Iscr;
    "&#296;": "\u0128", // &Itilde;
    "&#1030;": "\u0406", // &Iukcy;
    "&#207;": "\u00CF", // &Iuml
    "&#308;": "\u0134", // &Jcirc;
    "&#1049;": "\u0419", // &Jcy;
    "&#120077;": "\uD835\uDD0D", // &Jfr;
    "&#120129;": "\uD835\uDD41", // &Jopf;
    "&#119973;": "\uD835\uDCA5", // &Jscr;
    "&#1032;": "\u0408", // &Jsercy;
    "&#1028;": "\u0404", // &Jukcy;
    "&#1061;": "\u0425", // &KHcy;
    "&#1036;": "\u040C", // &KJcy;
    "&#922;": "\u039A", // &Kappa;
    "&#310;": "\u0136", // &Kcedil;
    "&#1050;": "\u041A", // &Kcy;
    "&#120078;": "\uD835\uDD0E", // &Kfr;
    "&#120130;": "\uD835\uDD42", // &Kopf;
    "&#119974;": "\uD835\uDCA6", // &Kscr;
    "&#1033;": "\u0409", // &LJcy;
    "&#60;": "\u003C", // &LT
    "&#313;": "\u0139", // &Lacute;
    "&#923;": "\u039B", // &Lambda;
    "&#10218;": "\u27EA", // &Lang;
    "&#8466;": "\u2112", // &Laplacetrf;
    "&#8606;": "\u219E", // &Larr;
    "&#317;": "\u013D", // &Lcaron;
    "&#315;": "\u013B", // &Lcedil;
    "&#1051;": "\u041B", // &Lcy;
    "&#10216;": "\u27E8", // &LeftAngleBracket;
    "&#8592;": "\u2190", // &LeftArrow;
    "&#8676;": "\u21E4", // &LeftArrowBar;
    "&#8646;": "\u21C6", // &LeftArrowRightArrow;
    "&#8968;": "\u2308", // &LeftCeiling;
    "&#10214;": "\u27E6", // &LeftDoubleBracket;
    "&#10593;": "\u2961", // &LeftDownTeeVector;
    "&#8643;": "\u21C3", // &LeftDownVector;
    "&#10585;": "\u2959", // &LeftDownVectorBar;
    "&#8970;": "\u230A", // &LeftFloor;
    "&#8596;": "\u2194", // &LeftRightArrow;
    "&#10574;": "\u294E", // &LeftRightVector;
    "&#8867;": "\u22A3", // &LeftTee;
    "&#8612;": "\u21A4", // &LeftTeeArrow;
    "&#10586;": "\u295A", // &LeftTeeVector;
    "&#8882;": "\u22B2", // &LeftTriangle;
    "&#10703;": "\u29CF", // &LeftTriangleBar;
    "&#8884;": "\u22B4", // &LeftTriangleEqual;
    "&#10577;": "\u2951", // &LeftUpDownVector;
    "&#10592;": "\u2960", // &LeftUpTeeVector;
    "&#8639;": "\u21BF", // &LeftUpVector;
    "&#10584;": "\u2958", // &LeftUpVectorBar;
    "&#8636;": "\u21BC", // &LeftVector;
    "&#10578;": "\u2952", // &LeftVectorBar;
    "&#8922;": "\u22DA", // &LessEqualGreater;
    "&#8806;": "\u2266", // &LessFullEqual;
    "&#8822;": "\u2276", // &LessGreater;
    "&#10913;": "\u2AA1", // &LessLess;
    "&#10877;": "\u2A7D", // &LessSlantEqual;
    "&#8818;": "\u2272", // &LessTilde;
    "&#120079;": "\uD835\uDD0F", // &Lfr;
    "&#8920;": "\u22D8", // &Ll;
    "&#8666;": "\u21DA", // &Lleftarrow;
    "&#319;": "\u013F", // &Lmidot;
    "&#10229;": "\u27F5", // &LongLeftArrow;
    "&#10231;": "\u27F7", // &LongLeftRightArrow;
    "&#10230;": "\u27F6", // &LongRightArrow;
    "&#120131;": "\uD835\uDD43", // &Lopf;
    "&#8601;": "\u2199", // &LowerLeftArrow;
    "&#8600;": "\u2198", // &LowerRightArrow;
    "&#8624;": "\u21B0", // &Lsh;
    "&#321;": "\u0141", // &Lstrok;
    "&#8810;": "\u226A", // &Lt;
    "&#10501;": "\u2905", // &Map;
    "&#1052;": "\u041C", // &Mcy;
    "&#8287;": "\u205F", // &MediumSpace;
    "&#8499;": "\u2133", // &Mellintrf;
    "&#120080;": "\uD835\uDD10", // &Mfr;
    "&#8723;": "\u2213", // &MinusPlus;
    "&#120132;": "\uD835\uDD44", // &Mopf;
    "&#924;": "\u039C", // &Mu;
    "&#1034;": "\u040A", // &NJcy;
    "&#323;": "\u0143", // &Nacute;
    "&#327;": "\u0147", // &Ncaron;
    "&#325;": "\u0145", // &Ncedil;
    "&#1053;": "\u041D", // &Ncy;
    "&#8203;": "\u200B", // &NegativeMediumSpace;
    "&#10;": "\u000A", // &NewLine;
    "&#120081;": "\uD835\uDD11", // &Nfr;
    "&#8288;": "\u2060", // &NoBreak;
    "&#160;": "\u00A0", // &NonBreakingSpace;
    "&#8469;": "\u2115", // &Nopf;
    "&#10988;": "\u2AEC", // &Not;
    "&#8802;": "\u2262", // &NotCongruent;
    "&#8813;": "\u226D", // &NotCupCap;
    "&#8742;": "\u2226", // &NotDoubleVerticalBar;
    "&#8713;": "\u2209", // &NotElement;
    "&#8800;": "\u2260", // &NotEqual;
    "&#8708;": "\u2204", // &NotExists;
    "&#8815;": "\u226F", // &NotGreater;
    "&#8817;": "\u2271", // &NotGreaterEqual;
    "&#8825;": "\u2279", // &NotGreaterLess;
    "&#8821;": "\u2275", // &NotGreaterTilde;
    "&#8938;": "\u22EA", // &NotLeftTriangle;
    "&#8940;": "\u22EC", // &NotLeftTriangleEqual;
    "&#8814;": "\u226E", // &NotLess;
    "&#8816;": "\u2270", // &NotLessEqual;
    "&#8824;": "\u2278", // &NotLessGreater;
    "&#8820;": "\u2274", // &NotLessTilde;
    "&#8832;": "\u2280", // &NotPrecedes;
    "&#10927;": "\u2AAF\u0338", // &NotPrecedesEqual;
    "&#8928;": "\u22E0", // &NotPrecedesSlantEqual;
    "&#8716;": "\u220C", // &NotReverseElement;
    "&#8939;": "\u22EB", // &NotRightTriangle;
    "&#10704;": "\u29D0\u0338", // &NotRightTriangleBar;
    "&#8941;": "\u22ED", // &NotRightTriangleEqual;
    "&#8847;": "\u228F\u0338", // &NotSquareSubset;
    "&#8930;": "\u22E2", // &NotSquareSubsetEqual;
    "&#8848;": "\u2290\u0338", // &NotSquareSuperset;
    "&#8931;": "\u22E3", // &NotSquareSupersetEqual;
    "&#8834;": "\u2282\u20D2", // &NotSubset;
    "&#8840;": "\u2288", // &NotSubsetEqual;
    "&#8833;": "\u2281", // &NotSucceeds;
    "&#10928;": "\u2AB0\u0338", // &NotSucceedsEqual;
    "&#8929;": "\u22E1", // &NotSucceedsSlantEqual;
    "&#8831;": "\u227F\u0338", // &NotSucceedsTilde;
    "&#8835;": "\u2283\u20D2", // &NotSuperset;
    "&#8841;": "\u2289", // &NotSupersetEqual;
    "&#8769;": "\u2241", // &NotTilde;
    "&#8772;": "\u2244", // &NotTildeEqual;
    "&#8775;": "\u2247", // &NotTildeFullEqual;
    "&#8777;": "\u2249", // &NotTildeTilde;
    "&#8740;": "\u2224", // &NotVerticalBar;
    "&#119977;": "\uD835\uDCA9", // &Nscr;
    "&#209;": "\u00D1", // &Ntilde
    "&#925;": "\u039D", // &Nu;
    "&#338;": "\u0152", // &OElig;
    "&#211;": "\u00D3", // &Oacute
    "&#212;": "\u00D4", // &Ocirc
    "&#1054;": "\u041E", // &Ocy;
    "&#336;": "\u0150", // &Odblac;
    "&#120082;": "\uD835\uDD12", // &Ofr;
    "&#210;": "\u00D2", // &Ograve
    "&#332;": "\u014C", // &Omacr;
    "&#937;": "\u03A9", // &Omega;
    "&#927;": "\u039F", // &Omicron;
    "&#120134;": "\uD835\uDD46", // &Oopf;
    "&#8220;": "\u201C", // &OpenCurlyDoubleQuote;
    "&#8216;": "\u2018", // &OpenCurlyQuote;
    "&#10836;": "\u2A54", // &Or;
    "&#119978;": "\uD835\uDCAA", // &Oscr;
    "&#216;": "\u00D8", // &Oslash
    "&#213;": "\u00D5", // &Otilde
    "&#10807;": "\u2A37", // &Otimes;
    "&#214;": "\u00D6", // &Ouml
    "&#8254;": "\u203E", // &OverBar;
    "&#9182;": "\u23DE", // &OverBrace;
    "&#9140;": "\u23B4", // &OverBracket;
    "&#9180;": "\u23DC", // &OverParenthesis;
    "&#8706;": "\u2202", // &PartialD;
    "&#1055;": "\u041F", // &Pcy;
    "&#120083;": "\uD835\uDD13", // &Pfr;
    "&#934;": "\u03A6", // &Phi;
    "&#928;": "\u03A0", // &Pi;
    "&#177;": "\u00B1", // &PlusMinus;
    "&#8473;": "\u2119", // &Popf;
    "&#10939;": "\u2ABB", // &Pr;
    "&#8826;": "\u227A", // &Precedes;
    "&#8828;": "\u227C", // &PrecedesSlantEqual;
    "&#8830;": "\u227E", // &PrecedesTilde;
    "&#8243;": "\u2033", // &Prime;
    "&#8719;": "\u220F", // &Product;
    "&#8733;": "\u221D", // &Proportional;
    "&#119979;": "\uD835\uDCAB", // &Pscr;
    "&#936;": "\u03A8", // &Psi;
    "&#34;": "\u0022", // &QUOT
    "&#120084;": "\uD835\uDD14", // &Qfr;
    "&#8474;": "\u211A", // &Qopf;
    "&#119980;": "\uD835\uDCAC", // &Qscr;
    "&#10512;": "\u2910", // &RBarr;
    "&#174;": "\u00AE", // &REG
    "&#340;": "\u0154", // &Racute;
    "&#10219;": "\u27EB", // &Rang;
    "&#8608;": "\u21A0", // &Rarr;
    "&#10518;": "\u2916", // &Rarrtl;
    "&#344;": "\u0158", // &Rcaron;
    "&#342;": "\u0156", // &Rcedil;
    "&#1056;": "\u0420", // &Rcy;
    "&#8476;": "\u211C", // &Re;
    "&#8715;": "\u220B", // &ReverseElement;
    "&#8651;": "\u21CB", // &ReverseEquilibrium;
    "&#10607;": "\u296F", // &ReverseUpEquilibrium;
    "&#929;": "\u03A1", // &Rho;
    "&#10217;": "\u27E9", // &RightAngleBracket;
    "&#8594;": "\u2192", // &RightArrow;
    "&#8677;": "\u21E5", // &RightArrowBar;
    "&#8644;": "\u21C4", // &RightArrowLeftArrow;
    "&#8969;": "\u2309", // &RightCeiling;
    "&#10215;": "\u27E7", // &RightDoubleBracket;
    "&#10589;": "\u295D", // &RightDownTeeVector;
    "&#8642;": "\u21C2", // &RightDownVector;
    "&#10581;": "\u2955", // &RightDownVectorBar;
    "&#8971;": "\u230B", // &RightFloor;
    "&#8866;": "\u22A2", // &RightTee;
    "&#8614;": "\u21A6", // &RightTeeArrow;
    "&#10587;": "\u295B", // &RightTeeVector;
    "&#8883;": "\u22B3", // &RightTriangle;
    "&#8885;": "\u22B5", // &RightTriangleEqual;
    "&#10575;": "\u294F", // &RightUpDownVector;
    "&#10588;": "\u295C", // &RightUpTeeVector;
    "&#8638;": "\u21BE", // &RightUpVector;
    "&#10580;": "\u2954", // &RightUpVectorBar;
    "&#8640;": "\u21C0", // &RightVector;
    "&#10579;": "\u2953", // &RightVectorBar;
    "&#8477;": "\u211D", // &Ropf;
    "&#10608;": "\u2970", // &RoundImplies;
    "&#8667;": "\u21DB", // &Rrightarrow;
    "&#8475;": "\u211B", // &Rscr;
    "&#8625;": "\u21B1", // &Rsh;
    "&#10740;": "\u29F4", // &RuleDelayed;
    "&#1065;": "\u0429", // &SHCHcy;
    "&#1064;": "\u0428", // &SHcy;
    "&#1068;": "\u042C", // &SOFTcy;
    "&#346;": "\u015A", // &Sacute;
    "&#10940;": "\u2ABC", // &Sc;
    "&#352;": "\u0160", // &Scaron;
    "&#350;": "\u015E", // &Scedil;
    "&#348;": "\u015C", // &Scirc;
    "&#1057;": "\u0421", // &Scy;
    "&#120086;": "\uD835\uDD16", // &Sfr;
    "&#8593;": "\u2191", // &ShortUpArrow;
    "&#931;": "\u03A3", // &Sigma;
    "&#8728;": "\u2218", // &SmallCircle;
    "&#120138;": "\uD835\uDD4A", // &Sopf;
    "&#8730;": "\u221A", // &Sqrt;
    "&#9633;": "\u25A1", // &Square;
    "&#8851;": "\u2293", // &SquareIntersection;
    "&#8849;": "\u2291", // &SquareSubsetEqual;
    "&#8850;": "\u2292", // &SquareSupersetEqual;
    "&#8852;": "\u2294", // &SquareUnion;
    "&#119982;": "\uD835\uDCAE", // &Sscr;
    "&#8902;": "\u22C6", // &Star;
    "&#8912;": "\u22D0", // &Sub;
    "&#8838;": "\u2286", // &SubsetEqual;
    "&#8827;": "\u227B", // &Succeeds;
    "&#8829;": "\u227D", // &SucceedsSlantEqual;
    "&#8721;": "\u2211", // &Sum;
    "&#8913;": "\u22D1", // &Sup;
    "&#8839;": "\u2287", // &SupersetEqual;
    "&#222;": "\u00DE", // &THORN
    "&#8482;": "\u2122", // &TRADE;
    "&#1035;": "\u040B", // &TSHcy;
    "&#1062;": "\u0426", // &TScy;
    "&#9;": "\u0009", // &Tab;
    "&#932;": "\u03A4", // &Tau;
    "&#356;": "\u0164", // &Tcaron;
    "&#354;": "\u0162", // &Tcedil;
    "&#1058;": "\u0422", // &Tcy;
    "&#120087;": "\uD835\uDD17", // &Tfr;
    "&#8756;": "\u2234", // &Therefore;
    "&#920;": "\u0398", // &Theta;
    "&#8201;": "\u2009", // &ThinSpace;
    "&#8764;": "\u223C", // &Tilde;
    "&#8771;": "\u2243", // &TildeEqual;
    "&#8773;": "\u2245", // &TildeFullEqual;
    "&#8776;": "\u2248", // &TildeTilde;
    "&#120139;": "\uD835\uDD4B", // &Topf;
    "&#8411;": "\u20DB", // &TripleDot;
    "&#119983;": "\uD835\uDCAF", // &Tscr;
    "&#358;": "\u0166", // &Tstrok;
    "&#218;": "\u00DA", // &Uacute
    "&#8607;": "\u219F", // &Uarr;
    "&#10569;": "\u2949", // &Uarrocir;
    "&#1038;": "\u040E", // &Ubrcy;
    "&#364;": "\u016C", // &Ubreve;
    "&#219;": "\u00DB", // &Ucirc
    "&#1059;": "\u0423", // &Ucy;
    "&#368;": "\u0170", // &Udblac;
    "&#120088;": "\uD835\uDD18", // &Ufr;
    "&#217;": "\u00D9", // &Ugrave
    "&#362;": "\u016A", // &Umacr;
    "&#95;": "\u005F", // &UnderBar;
    "&#9183;": "\u23DF", // &UnderBrace;
    "&#9141;": "\u23B5", // &UnderBracket;
    "&#9181;": "\u23DD", // &UnderParenthesis;
    "&#8899;": "\u22C3", // &Union;
    "&#8846;": "\u228E", // &UnionPlus;
    "&#370;": "\u0172", // &Uogon;
    "&#120140;": "\uD835\uDD4C", // &Uopf;
    "&#10514;": "\u2912", // &UpArrowBar;
    "&#8645;": "\u21C5", // &UpArrowDownArrow;
    "&#8597;": "\u2195", // &UpDownArrow;
    "&#10606;": "\u296E", // &UpEquilibrium;
    "&#8869;": "\u22A5", // &UpTee;
    "&#8613;": "\u21A5", // &UpTeeArrow;
    "&#8598;": "\u2196", // &UpperLeftArrow;
    "&#8599;": "\u2197", // &UpperRightArrow;
    "&#978;": "\u03D2", // &Upsi;
    "&#933;": "\u03A5", // &Upsilon;
    "&#366;": "\u016E", // &Uring;
    "&#119984;": "\uD835\uDCB0", // &Uscr;
    "&#360;": "\u0168", // &Utilde;
    "&#220;": "\u00DC", // &Uuml
    "&#8875;": "\u22AB", // &VDash;
    "&#10987;": "\u2AEB", // &Vbar;
    "&#1042;": "\u0412", // &Vcy;
    "&#8873;": "\u22A9", // &Vdash;
    "&#10982;": "\u2AE6", // &Vdashl;
    "&#8897;": "\u22C1", // &Vee;
    "&#8214;": "\u2016", // &Verbar;
    "&#8739;": "\u2223", // &VerticalBar;
    "&#124;": "\u007C", // &VerticalLine;
    "&#10072;": "\u2758", // &VerticalSeparator;
    "&#8768;": "\u2240", // &VerticalTilde;
    "&#8202;": "\u200A", // &VeryThinSpace;
    "&#120089;": "\uD835\uDD19", // &Vfr;
    "&#120141;": "\uD835\uDD4D", // &Vopf;
    "&#119985;": "\uD835\uDCB1", // &Vscr;
    "&#8874;": "\u22AA", // &Vvdash;
    "&#372;": "\u0174", // &Wcirc;
    "&#8896;": "\u22C0", // &Wedge;
    "&#120090;": "\uD835\uDD1A", // &Wfr;
    "&#120142;": "\uD835\uDD4E", // &Wopf;
    "&#119986;": "\uD835\uDCB2", // &Wscr;
    "&#120091;": "\uD835\uDD1B", // &Xfr;
    "&#926;": "\u039E", // &Xi;
    "&#120143;": "\uD835\uDD4F", // &Xopf;
    "&#119987;": "\uD835\uDCB3", // &Xscr;
    "&#1071;": "\u042F", // &YAcy;
    "&#1031;": "\u0407", // &YIcy;
    "&#1070;": "\u042E", // &YUcy;
    "&#221;": "\u00DD", // &Yacute
    "&#374;": "\u0176", // &Ycirc;
    "&#1067;": "\u042B", // &Ycy;
    "&#120092;": "\uD835\uDD1C", // &Yfr;
    "&#120144;": "\uD835\uDD50", // &Yopf;
    "&#119988;": "\uD835\uDCB4", // &Yscr;
    "&#376;": "\u0178", // &Yuml;
    "&#1046;": "\u0416", // &ZHcy;
    "&#377;": "\u0179", // &Zacute;
    "&#381;": "\u017D", // &Zcaron;
    "&#1047;": "\u0417", // &Zcy;
    "&#379;": "\u017B", // &Zdot;
    "&#918;": "\u0396", // &Zeta;
    "&#8488;": "\u2128", // &Zfr;
    "&#8484;": "\u2124", // &Zopf;
    "&#119989;": "\uD835\uDCB5", // &Zscr;
    "&#225;": "\u00E1", // &aacute
    "&#259;": "\u0103", // &abreve;
    "&#8766;": "\u223E", // &ac;
    "&#8767;": "\u223F", // &acd;
    "&#226;": "\u00E2", // &acirc
    "&#1072;": "\u0430", // &acy;
    "&#230;": "\u00E6", // &aelig
    "&#120094;": "\uD835\uDD1E", // &afr;
    "&#224;": "\u00E0", // &agrave
    "&#8501;": "\u2135", // &alefsym;
    "&#945;": "\u03B1", // &alpha;
    "&#257;": "\u0101", // &amacr;
    "&#10815;": "\u2A3F", // &amalg;
    "&#8743;": "\u2227", // &and;
    "&#10837;": "\u2A55", // &andand;
    "&#10844;": "\u2A5C", // &andd;
    "&#10840;": "\u2A58", // &andslope;
    "&#10842;": "\u2A5A", // &andv;
    "&#8736;": "\u2220", // &ang;
    "&#10660;": "\u29A4", // &ange;
    "&#8737;": "\u2221", // &angmsd;
    "&#10664;": "\u29A8", // &angmsdaa;
    "&#10665;": "\u29A9", // &angmsdab;
    "&#10666;": "\u29AA", // &angmsdac;
    "&#10667;": "\u29AB", // &angmsdad;
    "&#10668;": "\u29AC", // &angmsdae;
    "&#10669;": "\u29AD", // &angmsdaf;
    "&#10670;": "\u29AE", // &angmsdag;
    "&#10671;": "\u29AF", // &angmsdah;
    "&#8735;": "\u221F", // &angrt;
    "&#8894;": "\u22BE", // &angrtvb;
    "&#10653;": "\u299D", // &angrtvbd;
    "&#8738;": "\u2222", // &angsph;
    "&#9084;": "\u237C", // &angzarr;
    "&#261;": "\u0105", // &aogon;
    "&#120146;": "\uD835\uDD52", // &aopf;
    "&#10864;": "\u2A70", // &apE;
    "&#10863;": "\u2A6F", // &apacir;
    "&#8778;": "\u224A", // &ape;
    "&#8779;": "\u224B", // &apid;
    "&#39;": "\u0027", // &apos;
    "&#229;": "\u00E5", // &aring
    "&#119990;": "\uD835\uDCB6", // &ascr;
    "&#42;": "\u002A", // &ast;
    "&#227;": "\u00E3", // &atilde
    "&#228;": "\u00E4", // &auml
    "&#10769;": "\u2A11", // &awint;
    "&#10989;": "\u2AED", // &bNot;
    "&#8780;": "\u224C", // &backcong;
    "&#1014;": "\u03F6", // &backepsilon;
    "&#8245;": "\u2035", // &backprime;
    "&#8765;": "\u223D", // &backsim;
    "&#8909;": "\u22CD", // &backsimeq;
    "&#8893;": "\u22BD", // &barvee;
    "&#8965;": "\u2305", // &barwed;
    "&#9142;": "\u23B6", // &bbrktbrk;
    "&#1073;": "\u0431", // &bcy;
    "&#8222;": "\u201E", // &bdquo;
    "&#10672;": "\u29B0", // &bemptyv;
    "&#946;": "\u03B2", // &beta;
    "&#8502;": "\u2136", // &beth;
    "&#8812;": "\u226C", // &between;
    "&#120095;": "\uD835\uDD1F", // &bfr;
    "&#9711;": "\u25EF", // &bigcirc;
    "&#10752;": "\u2A00", // &bigodot;
    "&#10753;": "\u2A01", // &bigoplus;
    "&#10754;": "\u2A02", // &bigotimes;
    "&#10758;": "\u2A06", // &bigsqcup;
    "&#9733;": "\u2605", // &bigstar;
    "&#9661;": "\u25BD", // &bigtriangledown;
    "&#9651;": "\u25B3", // &bigtriangleup;
    "&#10756;": "\u2A04", // &biguplus;
    "&#10509;": "\u290D", // &bkarow;
    "&#10731;": "\u29EB", // &blacklozenge;
    "&#9652;": "\u25B4", // &blacktriangle;
    "&#9662;": "\u25BE", // &blacktriangledown;
    "&#9666;": "\u25C2", // &blacktriangleleft;
    "&#9656;": "\u25B8", // &blacktriangleright;
    "&#9251;": "\u2423", // &blank;
    "&#9618;": "\u2592", // &blk12;
    "&#9617;": "\u2591", // &blk14;
    "&#9619;": "\u2593", // &blk34;
    "&#9608;": "\u2588", // &block;
    "&#61;": "\u003D\u20E5", // &bne;
    "&#8976;": "\u2310", // &bnot;
    "&#120147;": "\uD835\uDD53", // &bopf;
    "&#8904;": "\u22C8", // &bowtie;
    "&#9559;": "\u2557", // &boxDL;
    "&#9556;": "\u2554", // &boxDR;
    "&#9558;": "\u2556", // &boxDl;
    "&#9555;": "\u2553", // &boxDr;
    "&#9552;": "\u2550", // &boxH;
    "&#9574;": "\u2566", // &boxHD;
    "&#9577;": "\u2569", // &boxHU;
    "&#9572;": "\u2564", // &boxHd;
    "&#9575;": "\u2567", // &boxHu;
    "&#9565;": "\u255D", // &boxUL;
    "&#9562;": "\u255A", // &boxUR;
    "&#9564;": "\u255C", // &boxUl;
    "&#9561;": "\u2559", // &boxUr;
    "&#9553;": "\u2551", // &boxV;
    "&#9580;": "\u256C", // &boxVH;
    "&#9571;": "\u2563", // &boxVL;
    "&#9568;": "\u2560", // &boxVR;
    "&#9579;": "\u256B", // &boxVh;
    "&#9570;": "\u2562", // &boxVl;
    "&#9567;": "\u255F", // &boxVr;
    "&#10697;": "\u29C9", // &boxbox;
    "&#9557;": "\u2555", // &boxdL;
    "&#9554;": "\u2552", // &boxdR;
    "&#9488;": "\u2510", // &boxdl;
    "&#9484;": "\u250C", // &boxdr;
    "&#9573;": "\u2565", // &boxhD;
    "&#9576;": "\u2568", // &boxhU;
    "&#9516;": "\u252C", // &boxhd;
    "&#9524;": "\u2534", // &boxhu;
    "&#8863;": "\u229F", // &boxminus;
    "&#8862;": "\u229E", // &boxplus;
    "&#8864;": "\u22A0", // &boxtimes;
    "&#9563;": "\u255B", // &boxuL;
    "&#9560;": "\u2558", // &boxuR;
    "&#9496;": "\u2518", // &boxul;
    "&#9492;": "\u2514", // &boxur;
    "&#9474;": "\u2502", // &boxv;
    "&#9578;": "\u256A", // &boxvH;
    "&#9569;": "\u2561", // &boxvL;
    "&#9566;": "\u255E", // &boxvR;
    "&#9532;": "\u253C", // &boxvh;
    "&#9508;": "\u2524", // &boxvl;
    "&#9500;": "\u251C", // &boxvr;
    "&#166;": "\u00A6", // &brvbar
    "&#119991;": "\uD835\uDCB7", // &bscr;
    "&#8271;": "\u204F", // &bsemi;
    "&#92;": "\u005C", // &bsol;
    "&#10693;": "\u29C5", // &bsolb;
    "&#10184;": "\u27C8", // &bsolhsub;
    "&#8226;": "\u2022", // &bull;
    "&#10926;": "\u2AAE", // &bumpE;
    "&#263;": "\u0107", // &cacute;
    "&#8745;": "\u2229", // &cap;
    "&#10820;": "\u2A44", // &capand;
    "&#10825;": "\u2A49", // &capbrcup;
    "&#10827;": "\u2A4B", // &capcap;
    "&#10823;": "\u2A47", // &capcup;
    "&#10816;": "\u2A40", // &capdot;
    "&#8257;": "\u2041", // &caret;
    "&#10829;": "\u2A4D", // &ccaps;
    "&#269;": "\u010D", // &ccaron;
    "&#231;": "\u00E7", // &ccedil
    "&#265;": "\u0109", // &ccirc;
    "&#10828;": "\u2A4C", // &ccups;
    "&#10832;": "\u2A50", // &ccupssm;
    "&#267;": "\u010B", // &cdot;
    "&#10674;": "\u29B2", // &cemptyv;
    "&#162;": "\u00A2", // &cent
    "&#120096;": "\uD835\uDD20", // &cfr;
    "&#1095;": "\u0447", // &chcy;
    "&#10003;": "\u2713", // &check;
    "&#967;": "\u03C7", // &chi;
    "&#9675;": "\u25CB", // &cir;
    "&#10691;": "\u29C3", // &cirE;
    "&#710;": "\u02C6", // &circ;
    "&#8791;": "\u2257", // &circeq;
    "&#8634;": "\u21BA", // &circlearrowleft;
    "&#8635;": "\u21BB", // &circlearrowright;
    "&#9416;": "\u24C8", // &circledS;
    "&#8859;": "\u229B", // &circledast;
    "&#8858;": "\u229A", // &circledcirc;
    "&#8861;": "\u229D", // &circleddash;
    "&#10768;": "\u2A10", // &cirfnint;
    "&#10991;": "\u2AEF", // &cirmid;
    "&#10690;": "\u29C2", // &cirscir;
    "&#9827;": "\u2663", // &clubs;
    "&#58;": "\u003A", // &colon;
    "&#44;": "\u002C", // &comma;
    "&#64;": "\u0040", // &commat;
    "&#8705;": "\u2201", // &comp;
    "&#10861;": "\u2A6D", // &congdot;
    "&#120148;": "\uD835\uDD54", // &copf;
    "&#8471;": "\u2117", // &copysr;
    "&#8629;": "\u21B5", // &crarr;
    "&#10007;": "\u2717", // &cross;
    "&#119992;": "\uD835\uDCB8", // &cscr;
    "&#10959;": "\u2ACF", // &csub;
    "&#10961;": "\u2AD1", // &csube;
    "&#10960;": "\u2AD0", // &csup;
    "&#10962;": "\u2AD2", // &csupe;
    "&#8943;": "\u22EF", // &ctdot;
    "&#10552;": "\u2938", // &cudarrl;
    "&#10549;": "\u2935", // &cudarrr;
    "&#8926;": "\u22DE", // &cuepr;
    "&#8927;": "\u22DF", // &cuesc;
    "&#8630;": "\u21B6", // &cularr;
    "&#10557;": "\u293D", // &cularrp;
    "&#8746;": "\u222A", // &cup;
    "&#10824;": "\u2A48", // &cupbrcap;
    "&#10822;": "\u2A46", // &cupcap;
    "&#10826;": "\u2A4A", // &cupcup;
    "&#8845;": "\u228D", // &cupdot;
    "&#10821;": "\u2A45", // &cupor;
    "&#8631;": "\u21B7", // &curarr;
    "&#10556;": "\u293C", // &curarrm;
    "&#8910;": "\u22CE", // &curlyvee;
    "&#8911;": "\u22CF", // &curlywedge;
    "&#164;": "\u00A4", // &curren
    "&#8753;": "\u2231", // &cwint;
    "&#9005;": "\u232D", // &cylcty;
    "&#10597;": "\u2965", // &dHar;
    "&#8224;": "\u2020", // &dagger;
    "&#8504;": "\u2138", // &daleth;
    "&#8208;": "\u2010", // &dash;
    "&#10511;": "\u290F", // &dbkarow;
    "&#271;": "\u010F", // &dcaron;
    "&#1076;": "\u0434", // &dcy;
    "&#8650;": "\u21CA", // &ddarr;
    "&#10871;": "\u2A77", // &ddotseq;
    "&#176;": "\u00B0", // &deg
    "&#948;": "\u03B4", // &delta;
    "&#10673;": "\u29B1", // &demptyv;
    "&#10623;": "\u297F", // &dfisht;
    "&#120097;": "\uD835\uDD21", // &dfr;
    "&#9830;": "\u2666", // &diamondsuit;
    "&#989;": "\u03DD", // &digamma;
    "&#8946;": "\u22F2", // &disin;
    "&#247;": "\u00F7", // &div;
    "&#8903;": "\u22C7", // &divideontimes;
    "&#1106;": "\u0452", // &djcy;
    "&#8990;": "\u231E", // &dlcorn;
    "&#8973;": "\u230D", // &dlcrop;
    "&#36;": "\u0024", // &dollar;
    "&#120149;": "\uD835\uDD55", // &dopf;
    "&#8785;": "\u2251", // &doteqdot;
    "&#8760;": "\u2238", // &dotminus;
    "&#8724;": "\u2214", // &dotplus;
    "&#8865;": "\u22A1", // &dotsquare;
    "&#8991;": "\u231F", // &drcorn;
    "&#8972;": "\u230C", // &drcrop;
    "&#119993;": "\uD835\uDCB9", // &dscr;
    "&#1109;": "\u0455", // &dscy;
    "&#10742;": "\u29F6", // &dsol;
    "&#273;": "\u0111", // &dstrok;
    "&#8945;": "\u22F1", // &dtdot;
    "&#9663;": "\u25BF", // &dtri;
    "&#10662;": "\u29A6", // &dwangle;
    "&#1119;": "\u045F", // &dzcy;
    "&#10239;": "\u27FF", // &dzigrarr;
    "&#233;": "\u00E9", // &eacute
    "&#10862;": "\u2A6E", // &easter;
    "&#283;": "\u011B", // &ecaron;
    "&#8790;": "\u2256", // &ecir;
    "&#234;": "\u00EA", // &ecirc
    "&#8789;": "\u2255", // &ecolon;
    "&#1101;": "\u044D", // &ecy;
    "&#279;": "\u0117", // &edot;
    "&#8786;": "\u2252", // &efDot;
    "&#120098;": "\uD835\uDD22", // &efr;
    "&#10906;": "\u2A9A", // &eg;
    "&#232;": "\u00E8", // &egrave
    "&#10902;": "\u2A96", // &egs;
    "&#10904;": "\u2A98", // &egsdot;
    "&#10905;": "\u2A99", // &el;
    "&#9191;": "\u23E7", // &elinters;
    "&#8467;": "\u2113", // &ell;
    "&#10901;": "\u2A95", // &els;
    "&#10903;": "\u2A97", // &elsdot;
    "&#275;": "\u0113", // &emacr;
    "&#8709;": "\u2205", // &empty;
    "&#8196;": "\u2004", // &emsp13;
    "&#8197;": "\u2005", // &emsp14;
    "&#8195;": "\u2003", // &emsp;
    "&#331;": "\u014B", // &eng;
    "&#8194;": "\u2002", // &ensp;
    "&#281;": "\u0119", // &eogon;
    "&#120150;": "\uD835\uDD56", // &eopf;
    "&#8917;": "\u22D5", // &epar;
    "&#10723;": "\u29E3", // &eparsl;
    "&#10865;": "\u2A71", // &eplus;
    "&#949;": "\u03B5", // &epsi;
    "&#1013;": "\u03F5", // &epsiv;
    "&#8799;": "\u225F", // &equest;
    "&#10872;": "\u2A78", // &equivDD;
    "&#10725;": "\u29E5", // &eqvparsl;
    "&#8787;": "\u2253", // &erDot;
    "&#10609;": "\u2971", // &erarr;
    "&#8495;": "\u212F", // &escr;
    "&#951;": "\u03B7", // &eta;
    "&#240;": "\u00F0", // &eth
    "&#235;": "\u00EB", // &euml
    "&#8364;": "\u20AC", // &euro;
    "&#33;": "\u0021", // &excl;
    "&#1092;": "\u0444", // &fcy;
    "&#9792;": "\u2640", // &female;
    "&#64259;": "\uFB03", // &ffilig;
    "&#64256;": "\uFB00", // &fflig;
    "&#64260;": "\uFB04", // &ffllig;
    "&#120099;": "\uD835\uDD23", // &ffr;
    "&#64257;": "\uFB01", // &filig;
    "&#102;": "\u0066\u006A", // &fjlig;
    "&#9837;": "\u266D", // &flat;
    "&#64258;": "\uFB02", // &fllig;
    "&#9649;": "\u25B1", // &fltns;
    "&#402;": "\u0192", // &fnof;
    "&#120151;": "\uD835\uDD57", // &fopf;
    "&#8916;": "\u22D4", // &fork;
    "&#10969;": "\u2AD9", // &forkv;
    "&#10765;": "\u2A0D", // &fpartint;
    "&#189;": "\u00BD", // &frac12
    "&#8531;": "\u2153", // &frac13;
    "&#188;": "\u00BC", // &frac14
    "&#8533;": "\u2155", // &frac15;
    "&#8537;": "\u2159", // &frac16;
    "&#8539;": "\u215B", // &frac18;
    "&#8532;": "\u2154", // &frac23;
    "&#8534;": "\u2156", // &frac25;
    "&#190;": "\u00BE", // &frac34
    "&#8535;": "\u2157", // &frac35;
    "&#8540;": "\u215C", // &frac38;
    "&#8536;": "\u2158", // &frac45;
    "&#8538;": "\u215A", // &frac56;
    "&#8541;": "\u215D", // &frac58;
    "&#8542;": "\u215E", // &frac78;
    "&#8260;": "\u2044", // &frasl;
    "&#8994;": "\u2322", // &frown;
    "&#119995;": "\uD835\uDCBB", // &fscr;
    "&#10892;": "\u2A8C", // &gEl;
    "&#501;": "\u01F5", // &gacute;
    "&#947;": "\u03B3", // &gamma;
    "&#10886;": "\u2A86", // &gap;
    "&#287;": "\u011F", // &gbreve;
    "&#285;": "\u011D", // &gcirc;
    "&#1075;": "\u0433", // &gcy;
    "&#289;": "\u0121", // &gdot;
    "&#10921;": "\u2AA9", // &gescc;
    "&#10880;": "\u2A80", // &gesdot;
    "&#10882;": "\u2A82", // &gesdoto;
    "&#10884;": "\u2A84", // &gesdotol;
    "&#10900;": "\u2A94", // &gesles;
    "&#120100;": "\uD835\uDD24", // &gfr;
    "&#8503;": "\u2137", // &gimel;
    "&#1107;": "\u0453", // &gjcy;
    "&#10898;": "\u2A92", // &glE;
    "&#10917;": "\u2AA5", // &gla;
    "&#10916;": "\u2AA4", // &glj;
    "&#8809;": "\u2269", // &gnE;
    "&#10890;": "\u2A8A", // &gnap;
    "&#10888;": "\u2A88", // &gne;
    "&#8935;": "\u22E7", // &gnsim;
    "&#120152;": "\uD835\uDD58", // &gopf;
    "&#8458;": "\u210A", // &gscr;
    "&#10894;": "\u2A8E", // &gsime;
    "&#10896;": "\u2A90", // &gsiml;
    "&#10919;": "\u2AA7", // &gtcc;
    "&#10874;": "\u2A7A", // &gtcir;
    "&#8919;": "\u22D7", // &gtdot;
    "&#10645;": "\u2995", // &gtlPar;
    "&#10876;": "\u2A7C", // &gtquest;
    "&#10616;": "\u2978", // &gtrarr;
    "&#1098;": "\u044A", // &hardcy;
    "&#10568;": "\u2948", // &harrcir;
    "&#8621;": "\u21AD", // &harrw;
    "&#8463;": "\u210F", // &hbar;
    "&#293;": "\u0125", // &hcirc;
    "&#9829;": "\u2665", // &hearts;
    "&#8230;": "\u2026", // &hellip;
    "&#8889;": "\u22B9", // &hercon;
    "&#120101;": "\uD835\uDD25", // &hfr;
    "&#10533;": "\u2925", // &hksearow;
    "&#10534;": "\u2926", // &hkswarow;
    "&#8703;": "\u21FF", // &hoarr;
    "&#8763;": "\u223B", // &homtht;
    "&#8617;": "\u21A9", // &hookleftarrow;
    "&#8618;": "\u21AA", // &hookrightarrow;
    "&#120153;": "\uD835\uDD59", // &hopf;
    "&#8213;": "\u2015", // &horbar;
    "&#119997;": "\uD835\uDCBD", // &hscr;
    "&#295;": "\u0127", // &hstrok;
    "&#8259;": "\u2043", // &hybull;
    "&#237;": "\u00ED", // &iacute
    "&#238;": "\u00EE", // &icirc
    "&#1080;": "\u0438", // &icy;
    "&#1077;": "\u0435", // &iecy;
    "&#161;": "\u00A1", // &iexcl
    "&#120102;": "\uD835\uDD26", // &ifr;
    "&#236;": "\u00EC", // &igrave
    "&#10764;": "\u2A0C", // &iiiint;
    "&#8749;": "\u222D", // &iiint;
    "&#10716;": "\u29DC", // &iinfin;
    "&#8489;": "\u2129", // &iiota;
    "&#307;": "\u0133", // &ijlig;
    "&#299;": "\u012B", // &imacr;
    "&#305;": "\u0131", // &imath;
    "&#8887;": "\u22B7", // &imof;
    "&#437;": "\u01B5", // &imped;
    "&#8453;": "\u2105", // &incare;
    "&#8734;": "\u221E", // &infin;
    "&#10717;": "\u29DD", // &infintie;
    "&#8890;": "\u22BA", // &intcal;
    "&#10775;": "\u2A17", // &intlarhk;
    "&#10812;": "\u2A3C", // &intprod;
    "&#1105;": "\u0451", // &iocy;
    "&#303;": "\u012F", // &iogon;
    "&#120154;": "\uD835\uDD5A", // &iopf;
    "&#953;": "\u03B9", // &iota;
    "&#191;": "\u00BF", // &iquest
    "&#119998;": "\uD835\uDCBE", // &iscr;
    "&#8953;": "\u22F9", // &isinE;
    "&#8949;": "\u22F5", // &isindot;
    "&#8948;": "\u22F4", // &isins;
    "&#8947;": "\u22F3", // &isinsv;
    "&#297;": "\u0129", // &itilde;
    "&#1110;": "\u0456", // &iukcy;
    "&#239;": "\u00EF", // &iuml
    "&#309;": "\u0135", // &jcirc;
    "&#1081;": "\u0439", // &jcy;
    "&#120103;": "\uD835\uDD27", // &jfr;
    "&#567;": "\u0237", // &jmath;
    "&#120155;": "\uD835\uDD5B", // &jopf;
    "&#119999;": "\uD835\uDCBF", // &jscr;
    "&#1112;": "\u0458", // &jsercy;
    "&#1108;": "\u0454", // &jukcy;
    "&#954;": "\u03BA", // &kappa;
    "&#1008;": "\u03F0", // &kappav;
    "&#311;": "\u0137", // &kcedil;
    "&#1082;": "\u043A", // &kcy;
    "&#120104;": "\uD835\uDD28", // &kfr;
    "&#312;": "\u0138", // &kgreen;
    "&#1093;": "\u0445", // &khcy;
    "&#1116;": "\u045C", // &kjcy;
    "&#120156;": "\uD835\uDD5C", // &kopf;
    "&#120000;": "\uD835\uDCC0", // &kscr;
    "&#10523;": "\u291B", // &lAtail;
    "&#10510;": "\u290E", // &lBarr;
    "&#10891;": "\u2A8B", // &lEg;
    "&#10594;": "\u2962", // &lHar;
    "&#314;": "\u013A", // &lacute;
    "&#10676;": "\u29B4", // &laemptyv;
    "&#955;": "\u03BB", // &lambda;
    "&#10641;": "\u2991", // &langd;
    "&#10885;": "\u2A85", // &lap;
    "&#171;": "\u00AB", // &laquo
    "&#10527;": "\u291F", // &larrbfs;
    "&#10525;": "\u291D", // &larrfs;
    "&#8619;": "\u21AB", // &larrlp;
    "&#10553;": "\u2939", // &larrpl;
    "&#10611;": "\u2973", // &larrsim;
    "&#8610;": "\u21A2", // &larrtl;
    "&#10923;": "\u2AAB", // &lat;
    "&#10521;": "\u2919", // &latail;
    "&#10925;": "\u2AAD", // &late;
    "&#10508;": "\u290C", // &lbarr;
    "&#10098;": "\u2772", // &lbbrk;
    "&#123;": "\u007B", // &lbrace;
    "&#91;": "\u005B", // &lbrack;
    "&#10635;": "\u298B", // &lbrke;
    "&#10639;": "\u298F", // &lbrksld;
    "&#10637;": "\u298D", // &lbrkslu;
    "&#318;": "\u013E", // &lcaron;
    "&#316;": "\u013C", // &lcedil;
    "&#1083;": "\u043B", // &lcy;
    "&#10550;": "\u2936", // &ldca;
    "&#10599;": "\u2967", // &ldrdhar;
    "&#10571;": "\u294B", // &ldrushar;
    "&#8626;": "\u21B2", // &ldsh;
    "&#8804;": "\u2264", // &le;
    "&#8647;": "\u21C7", // &leftleftarrows;
    "&#8907;": "\u22CB", // &leftthreetimes;
    "&#10920;": "\u2AA8", // &lescc;
    "&#10879;": "\u2A7F", // &lesdot;
    "&#10881;": "\u2A81", // &lesdoto;
    "&#10883;": "\u2A83", // &lesdotor;
    "&#10899;": "\u2A93", // &lesges;
    "&#8918;": "\u22D6", // &lessdot;
    "&#10620;": "\u297C", // &lfisht;
    "&#120105;": "\uD835\uDD29", // &lfr;
    "&#10897;": "\u2A91", // &lgE;
    "&#10602;": "\u296A", // &lharul;
    "&#9604;": "\u2584", // &lhblk;
    "&#1113;": "\u0459", // &ljcy;
    "&#10603;": "\u296B", // &llhard;
    "&#9722;": "\u25FA", // &lltri;
    "&#320;": "\u0140", // &lmidot;
    "&#9136;": "\u23B0", // &lmoust;
    "&#8808;": "\u2268", // &lnE;
    "&#10889;": "\u2A89", // &lnap;
    "&#10887;": "\u2A87", // &lne;
    "&#8934;": "\u22E6", // &lnsim;
    "&#10220;": "\u27EC", // &loang;
    "&#8701;": "\u21FD", // &loarr;
    "&#10236;": "\u27FC", // &longmapsto;
    "&#8620;": "\u21AC", // &looparrowright;
    "&#10629;": "\u2985", // &lopar;
    "&#120157;": "\uD835\uDD5D", // &lopf;
    "&#10797;": "\u2A2D", // &loplus;
    "&#10804;": "\u2A34", // &lotimes;
    "&#8727;": "\u2217", // &lowast;
    "&#9674;": "\u25CA", // &loz;
    "&#40;": "\u0028", // &lpar;
    "&#10643;": "\u2993", // &lparlt;
    "&#10605;": "\u296D", // &lrhard;
    "&#8206;": "\u200E", // &lrm;
    "&#8895;": "\u22BF", // &lrtri;
    "&#8249;": "\u2039", // &lsaquo;
    "&#120001;": "\uD835\uDCC1", // &lscr;
    "&#10893;": "\u2A8D", // &lsime;
    "&#10895;": "\u2A8F", // &lsimg;
    "&#8218;": "\u201A", // &lsquor;
    "&#322;": "\u0142", // &lstrok;
    "&#10918;": "\u2AA6", // &ltcc;
    "&#10873;": "\u2A79", // &ltcir;
    "&#8905;": "\u22C9", // &ltimes;
    "&#10614;": "\u2976", // &ltlarr;
    "&#10875;": "\u2A7B", // &ltquest;
    "&#10646;": "\u2996", // &ltrPar;
    "&#9667;": "\u25C3", // &ltri;
    "&#10570;": "\u294A", // &lurdshar;
    "&#10598;": "\u2966", // &luruhar;
    "&#8762;": "\u223A", // &mDDot;
    "&#175;": "\u00AF", // &macr
    "&#9794;": "\u2642", // &male;
    "&#10016;": "\u2720", // &malt;
    "&#9646;": "\u25AE", // &marker;
    "&#10793;": "\u2A29", // &mcomma;
    "&#1084;": "\u043C", // &mcy;
    "&#8212;": "\u2014", // &mdash;
    "&#120106;": "\uD835\uDD2A", // &mfr;
    "&#8487;": "\u2127", // &mho;
    "&#181;": "\u00B5", // &micro
    "&#10992;": "\u2AF0", // &midcir;
    "&#8722;": "\u2212", // &minus;
    "&#10794;": "\u2A2A", // &minusdu;
    "&#10971;": "\u2ADB", // &mlcp;
    "&#8871;": "\u22A7", // &models;
    "&#120158;": "\uD835\uDD5E", // &mopf;
    "&#120002;": "\uD835\uDCC2", // &mscr;
    "&#956;": "\u03BC", // &mu;
    "&#8888;": "\u22B8", // &multimap;
    "&#8653;": "\u21CD", // &nLeftarrow;
    "&#8654;": "\u21CE", // &nLeftrightarrow;
    "&#8655;": "\u21CF", // &nRightarrow;
    "&#8879;": "\u22AF", // &nVDash;
    "&#8878;": "\u22AE", // &nVdash;
    "&#324;": "\u0144", // &nacute;
    "&#329;": "\u0149", // &napos;
    "&#9838;": "\u266E", // &natur;
    "&#10819;": "\u2A43", // &ncap;
    "&#328;": "\u0148", // &ncaron;
    "&#326;": "\u0146", // &ncedil;
    "&#10818;": "\u2A42", // &ncup;
    "&#1085;": "\u043D", // &ncy;
    "&#8211;": "\u2013", // &ndash;
    "&#8663;": "\u21D7", // &neArr;
    "&#10532;": "\u2924", // &nearhk;
    "&#10536;": "\u2928", // &nesear;
    "&#120107;": "\uD835\uDD2B", // &nfr;
    "&#8622;": "\u21AE", // &nharr;
    "&#10994;": "\u2AF2", // &nhpar;
    "&#8956;": "\u22FC", // &nis;
    "&#8954;": "\u22FA", // &nisd;
    "&#1114;": "\u045A", // &njcy;
    "&#8602;": "\u219A", // &nlarr;
    "&#8229;": "\u2025", // &nldr;
    "&#120159;": "\uD835\uDD5F", // &nopf;
    "&#172;": "\u00AC", // &not
    "&#8951;": "\u22F7", // &notinvb;
    "&#8950;": "\u22F6", // &notinvc;
    "&#8958;": "\u22FE", // &notnivb;
    "&#8957;": "\u22FD", // &notnivc;
    "&#11005;": "\u2AFD\u20E5", // &nparsl;
    "&#10772;": "\u2A14", // &npolint;
    "&#8603;": "\u219B", // &nrarr;
    "&#10547;": "\u2933\u0338", // &nrarrc;
    "&#8605;": "\u219D\u0338", // &nrarrw;
    "&#120003;": "\uD835\uDCC3", // &nscr;
    "&#8836;": "\u2284", // &nsub;
    "&#10949;": "\u2AC5\u0338", // &nsubE;
    "&#8837;": "\u2285", // &nsup;
    "&#10950;": "\u2AC6\u0338", // &nsupE;
    "&#241;": "\u00F1", // &ntilde
    "&#957;": "\u03BD", // &nu;
    "&#35;": "\u0023", // &num;
    "&#8470;": "\u2116", // &numero;
    "&#8199;": "\u2007", // &numsp;
    "&#8877;": "\u22AD", // &nvDash;
    "&#10500;": "\u2904", // &nvHarr;
    "&#8876;": "\u22AC", // &nvdash;
    "&#10718;": "\u29DE", // &nvinfin;
    "&#10498;": "\u2902", // &nvlArr;
    "&#10499;": "\u2903", // &nvrArr;
    "&#8662;": "\u21D6", // &nwArr;
    "&#10531;": "\u2923", // &nwarhk;
    "&#10535;": "\u2927", // &nwnear;
    "&#243;": "\u00F3", // &oacute
    "&#244;": "\u00F4", // &ocirc
    "&#1086;": "\u043E", // &ocy;
    "&#337;": "\u0151", // &odblac;
    "&#10808;": "\u2A38", // &odiv;
    "&#10684;": "\u29BC", // &odsold;
    "&#339;": "\u0153", // &oelig;
    "&#10687;": "\u29BF", // &ofcir;
    "&#120108;": "\uD835\uDD2C", // &ofr;
    "&#731;": "\u02DB", // &ogon;
    "&#242;": "\u00F2", // &ograve
    "&#10689;": "\u29C1", // &ogt;
    "&#10677;": "\u29B5", // &ohbar;
    "&#10686;": "\u29BE", // &olcir;
    "&#10683;": "\u29BB", // &olcross;
    "&#10688;": "\u29C0", // &olt;
    "&#333;": "\u014D", // &omacr;
    "&#969;": "\u03C9", // &omega;
    "&#959;": "\u03BF", // &omicron;
    "&#10678;": "\u29B6", // &omid;
    "&#120160;": "\uD835\uDD60", // &oopf;
    "&#10679;": "\u29B7", // &opar;
    "&#10681;": "\u29B9", // &operp;
    "&#8744;": "\u2228", // &or;
    "&#10845;": "\u2A5D", // &ord;
    "&#8500;": "\u2134", // &order;
    "&#170;": "\u00AA", // &ordf
    "&#186;": "\u00BA", // &ordm
    "&#8886;": "\u22B6", // &origof;
    "&#10838;": "\u2A56", // &oror;
    "&#10839;": "\u2A57", // &orslope;
    "&#10843;": "\u2A5B", // &orv;
    "&#248;": "\u00F8", // &oslash
    "&#8856;": "\u2298", // &osol;
    "&#245;": "\u00F5", // &otilde
    "&#10806;": "\u2A36", // &otimesas;
    "&#246;": "\u00F6", // &ouml
    "&#9021;": "\u233D", // &ovbar;
    "&#182;": "\u00B6", // &para
    "&#10995;": "\u2AF3", // &parsim;
    "&#1087;": "\u043F", // &pcy;
    "&#37;": "\u0025", // &percnt;
    "&#46;": "\u002E", // &period;
    "&#8240;": "\u2030", // &permil;
    "&#8241;": "\u2031", // &pertenk;
    "&#120109;": "\uD835\uDD2D", // &pfr;
    "&#966;": "\u03C6", // &phi;
    "&#981;": "\u03D5", // &phiv;
    "&#9742;": "\u260E", // &phone;
    "&#960;": "\u03C0", // &pi;
    "&#982;": "\u03D6", // &piv;
    "&#8462;": "\u210E", // &planckh;
    "&#43;": "\u002B", // &plus;
    "&#10787;": "\u2A23", // &plusacir;
    "&#10786;": "\u2A22", // &pluscir;
    "&#10789;": "\u2A25", // &plusdu;
    "&#10866;": "\u2A72", // &pluse;
    "&#10790;": "\u2A26", // &plussim;
    "&#10791;": "\u2A27", // &plustwo;
    "&#10773;": "\u2A15", // &pointint;
    "&#120161;": "\uD835\uDD61", // &popf;
    "&#163;": "\u00A3", // &pound
    "&#10931;": "\u2AB3", // &prE;
    "&#10935;": "\u2AB7", // &prap;
    "&#10937;": "\u2AB9", // &precnapprox;
    "&#10933;": "\u2AB5", // &precneqq;
    "&#8936;": "\u22E8", // &precnsim;
    "&#8242;": "\u2032", // &prime;
    "&#9006;": "\u232E", // &profalar;
    "&#8978;": "\u2312", // &profline;
    "&#8979;": "\u2313", // &profsurf;
    "&#8880;": "\u22B0", // &prurel;
    "&#120005;": "\uD835\uDCC5", // &pscr;
    "&#968;": "\u03C8", // &psi;
    "&#8200;": "\u2008", // &puncsp;
    "&#120110;": "\uD835\uDD2E", // &qfr;
    "&#120162;": "\uD835\uDD62", // &qopf;
    "&#8279;": "\u2057", // &qprime;
    "&#120006;": "\uD835\uDCC6", // &qscr;
    "&#10774;": "\u2A16", // &quatint;
    "&#63;": "\u003F", // &quest;
    "&#10524;": "\u291C", // &rAtail;
    "&#10596;": "\u2964", // &rHar;
    "&#341;": "\u0155", // &racute;
    "&#10675;": "\u29B3", // &raemptyv;
    "&#10642;": "\u2992", // &rangd;
    "&#10661;": "\u29A5", // &range;
    "&#187;": "\u00BB", // &raquo
    "&#10613;": "\u2975", // &rarrap;
    "&#10528;": "\u2920", // &rarrbfs;
    "&#10526;": "\u291E", // &rarrfs;
    "&#10565;": "\u2945", // &rarrpl;
    "&#10612;": "\u2974", // &rarrsim;
    "&#8611;": "\u21A3", // &rarrtl;
    "&#10522;": "\u291A", // &ratail;
    "&#8758;": "\u2236", // &ratio;
    "&#10099;": "\u2773", // &rbbrk;
    "&#125;": "\u007D", // &rbrace;
    "&#93;": "\u005D", // &rbrack;
    "&#10636;": "\u298C", // &rbrke;
    "&#10638;": "\u298E", // &rbrksld;
    "&#10640;": "\u2990", // &rbrkslu;
    "&#345;": "\u0159", // &rcaron;
    "&#343;": "\u0157", // &rcedil;
    "&#1088;": "\u0440", // &rcy;
    "&#10551;": "\u2937", // &rdca;
    "&#10601;": "\u2969", // &rdldhar;
    "&#8627;": "\u21B3", // &rdsh;
    "&#9645;": "\u25AD", // &rect;
    "&#10621;": "\u297D", // &rfisht;
    "&#120111;": "\uD835\uDD2F", // &rfr;
    "&#10604;": "\u296C", // &rharul;
    "&#961;": "\u03C1", // &rho;
    "&#1009;": "\u03F1", // &rhov;
    "&#8649;": "\u21C9", // &rightrightarrows;
    "&#8908;": "\u22CC", // &rightthreetimes;
    "&#730;": "\u02DA", // &ring;
    "&#8207;": "\u200F", // &rlm;
    "&#9137;": "\u23B1", // &rmoust;
    "&#10990;": "\u2AEE", // &rnmid;
    "&#10221;": "\u27ED", // &roang;
    "&#8702;": "\u21FE", // &roarr;
    "&#10630;": "\u2986", // &ropar;
    "&#120163;": "\uD835\uDD63", // &ropf;
    "&#10798;": "\u2A2E", // &roplus;
    "&#10805;": "\u2A35", // &rotimes;
    "&#41;": "\u0029", // &rpar;
    "&#10644;": "\u2994", // &rpargt;
    "&#10770;": "\u2A12", // &rppolint;
    "&#8250;": "\u203A", // &rsaquo;
    "&#120007;": "\uD835\uDCC7", // &rscr;
    "&#8906;": "\u22CA", // &rtimes;
    "&#9657;": "\u25B9", // &rtri;
    "&#10702;": "\u29CE", // &rtriltri;
    "&#10600;": "\u2968", // &ruluhar;
    "&#8478;": "\u211E", // &rx;
    "&#347;": "\u015B", // &sacute;
    "&#10932;": "\u2AB4", // &scE;
    "&#10936;": "\u2AB8", // &scap;
    "&#353;": "\u0161", // &scaron;
    "&#351;": "\u015F", // &scedil;
    "&#349;": "\u015D", // &scirc;
    "&#10934;": "\u2AB6", // &scnE;
    "&#10938;": "\u2ABA", // &scnap;
    "&#8937;": "\u22E9", // &scnsim;
    "&#10771;": "\u2A13", // &scpolint;
    "&#1089;": "\u0441", // &scy;
    "&#8901;": "\u22C5", // &sdot;
    "&#10854;": "\u2A66", // &sdote;
    "&#8664;": "\u21D8", // &seArr;
    "&#167;": "\u00A7", // &sect
    "&#59;": "\u003B", // &semi;
    "&#10537;": "\u2929", // &seswar;
    "&#10038;": "\u2736", // &sext;
    "&#120112;": "\uD835\uDD30", // &sfr;
    "&#9839;": "\u266F", // &sharp;
    "&#1097;": "\u0449", // &shchcy;
    "&#1096;": "\u0448", // &shcy;
    "&#173;": "\u00AD", // &shy
    "&#963;": "\u03C3", // &sigma;
    "&#962;": "\u03C2", // &sigmaf;
    "&#10858;": "\u2A6A", // &simdot;
    "&#10910;": "\u2A9E", // &simg;
    "&#10912;": "\u2AA0", // &simgE;
    "&#10909;": "\u2A9D", // &siml;
    "&#10911;": "\u2A9F", // &simlE;
    "&#8774;": "\u2246", // &simne;
    "&#10788;": "\u2A24", // &simplus;
    "&#10610;": "\u2972", // &simrarr;
    "&#10803;": "\u2A33", // &smashp;
    "&#10724;": "\u29E4", // &smeparsl;
    "&#8995;": "\u2323", // &smile;
    "&#10922;": "\u2AAA", // &smt;
    "&#10924;": "\u2AAC", // &smte;
    "&#1100;": "\u044C", // &softcy;
    "&#47;": "\u002F", // &sol;
    "&#10692;": "\u29C4", // &solb;
    "&#9023;": "\u233F", // &solbar;
    "&#120164;": "\uD835\uDD64", // &sopf;
    "&#9824;": "\u2660", // &spades;
    "&#120008;": "\uD835\uDCC8", // &sscr;
    "&#9734;": "\u2606", // &star;
    "&#10941;": "\u2ABD", // &subdot;
    "&#10947;": "\u2AC3", // &subedot;
    "&#10945;": "\u2AC1", // &submult;
    "&#10955;": "\u2ACB", // &subnE;
    "&#8842;": "\u228A", // &subne;
    "&#10943;": "\u2ABF", // &subplus;
    "&#10617;": "\u2979", // &subrarr;
    "&#10951;": "\u2AC7", // &subsim;
    "&#10965;": "\u2AD5", // &subsub;
    "&#10963;": "\u2AD3", // &subsup;
    "&#9834;": "\u266A", // &sung;
    "&#185;": "\u00B9", // &sup1
    "&#178;": "\u00B2", // &sup2
    "&#179;": "\u00B3", // &sup3
    "&#10942;": "\u2ABE", // &supdot;
    "&#10968;": "\u2AD8", // &supdsub;
    "&#10948;": "\u2AC4", // &supedot;
    "&#10185;": "\u27C9", // &suphsol;
    "&#10967;": "\u2AD7", // &suphsub;
    "&#10619;": "\u297B", // &suplarr;
    "&#10946;": "\u2AC2", // &supmult;
    "&#10956;": "\u2ACC", // &supnE;
    "&#8843;": "\u228B", // &supne;
    "&#10944;": "\u2AC0", // &supplus;
    "&#10952;": "\u2AC8", // &supsim;
    "&#10964;": "\u2AD4", // &supsub;
    "&#10966;": "\u2AD6", // &supsup;
    "&#8665;": "\u21D9", // &swArr;
    "&#10538;": "\u292A", // &swnwar;
    "&#223;": "\u00DF", // &szlig
    "&#8982;": "\u2316", // &target;
    "&#964;": "\u03C4", // &tau;
    "&#357;": "\u0165", // &tcaron;
    "&#355;": "\u0163", // &tcedil;
    "&#1090;": "\u0442", // &tcy;
    "&#8981;": "\u2315", // &telrec;
    "&#120113;": "\uD835\uDD31", // &tfr;
    "&#952;": "\u03B8", // &theta;
    "&#977;": "\u03D1", // &thetasym;
    "&#254;": "\u00FE", // &thorn
    "&#215;": "\u00D7", // &times
    "&#10801;": "\u2A31", // &timesbar;
    "&#10800;": "\u2A30", // &timesd;
    "&#9014;": "\u2336", // &topbot;
    "&#10993;": "\u2AF1", // &topcir;
    "&#120165;": "\uD835\uDD65", // &topf;
    "&#10970;": "\u2ADA", // &topfork;
    "&#8244;": "\u2034", // &tprime;
    "&#9653;": "\u25B5", // &triangle;
    "&#8796;": "\u225C", // &triangleq;
    "&#9708;": "\u25EC", // &tridot;
    "&#10810;": "\u2A3A", // &triminus;
    "&#10809;": "\u2A39", // &triplus;
    "&#10701;": "\u29CD", // &trisb;
    "&#10811;": "\u2A3B", // &tritime;
    "&#9186;": "\u23E2", // &trpezium;
    "&#120009;": "\uD835\uDCC9", // &tscr;
    "&#1094;": "\u0446", // &tscy;
    "&#1115;": "\u045B", // &tshcy;
    "&#359;": "\u0167", // &tstrok;
    "&#10595;": "\u2963", // &uHar;
    "&#250;": "\u00FA", // &uacute
    "&#1118;": "\u045E", // &ubrcy;
    "&#365;": "\u016D", // &ubreve;
    "&#251;": "\u00FB", // &ucirc
    "&#1091;": "\u0443", // &ucy;
    "&#369;": "\u0171", // &udblac;
    "&#10622;": "\u297E", // &ufisht;
    "&#120114;": "\uD835\uDD32", // &ufr;
    "&#249;": "\u00F9", // &ugrave
    "&#9600;": "\u2580", // &uhblk;
    "&#8988;": "\u231C", // &ulcorn;
    "&#8975;": "\u230F", // &ulcrop;
    "&#9720;": "\u25F8", // &ultri;
    "&#363;": "\u016B", // &umacr;
    "&#371;": "\u0173", // &uogon;
    "&#120166;": "\uD835\uDD66", // &uopf;
    "&#965;": "\u03C5", // &upsi;
    "&#8648;": "\u21C8", // &upuparrows;
    "&#8989;": "\u231D", // &urcorn;
    "&#8974;": "\u230E", // &urcrop;
    "&#367;": "\u016F", // &uring;
    "&#9721;": "\u25F9", // &urtri;
    "&#120010;": "\uD835\uDCCA", // &uscr;
    "&#8944;": "\u22F0", // &utdot;
    "&#361;": "\u0169", // &utilde;
    "&#252;": "\u00FC", // &uuml
    "&#10663;": "\u29A7", // &uwangle;
    "&#10984;": "\u2AE8", // &vBar;
    "&#10985;": "\u2AE9", // &vBarv;
    "&#10652;": "\u299C", // &vangrt;
    "&#1074;": "\u0432", // &vcy;
    "&#8891;": "\u22BB", // &veebar;
    "&#8794;": "\u225A", // &veeeq;
    "&#8942;": "\u22EE", // &vellip;
    "&#120115;": "\uD835\uDD33", // &vfr;
    "&#120167;": "\uD835\uDD67", // &vopf;
    "&#120011;": "\uD835\uDCCB", // &vscr;
    "&#10650;": "\u299A", // &vzigzag;
    "&#373;": "\u0175", // &wcirc;
    "&#10847;": "\u2A5F", // &wedbar;
    "&#8793;": "\u2259", // &wedgeq;
    "&#8472;": "\u2118", // &weierp;
    "&#120116;": "\uD835\uDD34", // &wfr;
    "&#120168;": "\uD835\uDD68", // &wopf;
    "&#120012;": "\uD835\uDCCC", // &wscr;
    "&#120117;": "\uD835\uDD35", // &xfr;
    "&#958;": "\u03BE", // &xi;
    "&#8955;": "\u22FB", // &xnis;
    "&#120169;": "\uD835\uDD69", // &xopf;
    "&#120013;": "\uD835\uDCCD", // &xscr;
    "&#253;": "\u00FD", // &yacute
    "&#1103;": "\u044F", // &yacy;
    "&#375;": "\u0177", // &ycirc;
    "&#1099;": "\u044B", // &ycy;
    "&#165;": "\u00A5", // &yen
    "&#120118;": "\uD835\uDD36", // &yfr;
    "&#1111;": "\u0457", // &yicy;
    "&#120170;": "\uD835\uDD6A", // &yopf;
    "&#120014;": "\uD835\uDCCE", // &yscr;
    "&#1102;": "\u044E", // &yucy;
    "&#255;": "\u00FF", // &yuml
    "&#378;": "\u017A", // &zacute;
    "&#382;": "\u017E", // &zcaron;
    "&#1079;": "\u0437", // &zcy;
    "&#380;": "\u017C", // &zdot;
    "&#950;": "\u03B6", // &zeta;
    "&#120119;": "\uD835\uDD37", // &zfr;
    "&#1078;": "\u0436", // &zhcy;
    "&#8669;": "\u21DD", // &zigrarr;
    "&#120171;": "\uD835\uDD6B", // &zopf;
    "&#120015;": "\uD835\uDCCF", // &zscr;
    "&#8205;": "\u200D", // &zwj;
    "&#8204;": "\u200C", // &zwnj;
};

// jaon <-> iimage
const imgMap: Record<string, string> = {
    "id": "ID",
    "name": "File.Name", // same url+md5+ext, There is a real file name property called "Metadata.filename.0", but it is rarely seen and an error occurs if this property does not exist.
    "file_url": "File.Url",
    "file_size": "File.Size",
    //"sha256": "File.Sha256",
    "md5": "File.Md5",
    "date": "File.CreatedDate",
    "width": "Dimension.Width",
    "height": "Dimension.Height",
    "preview_url": "Thumbnails.2.File.Url", // thumbnails size - 0:256px, 1:512px, 2:1024px
    "preview_width": "Thumbnails.2.File.Url",
    "preview_height": "Thumbnails.2.File.Url",
    "sources": "Metadata.source",
};

// -------- Static Map End --------


// -------- Custom Function Start --------

// Convert to be compatible with existing tag DB
function tag_refinement(images: IImage): void {
    if (images.tags) {
        if (isString(images.tags)) {
            let vaild_tag_check_temp = images.tags.toString();
            if (vaild_tag_check_temp === "null") { // Image tag Not existing image
                images.tags = []; // If tags is (null), the image will not be displayed. Therefore, it is set to an empty list.
            }
            else {
                vaild_tag_check_temp = recover_html_entity(vaild_tag_check_temp); // convert HTML entity to special characters
                images.tags = JSON.parse('{"tags":'+vaild_tag_check_temp+'}')["tags"];
            }
        }
        // I don't think ITag[] will ever be used as an argument in this function.
        /*else if (isITagArr(images.tags)) {
            for(let tag_index=0; tag_index < images.tags.length; tag_index++) {
                images.tags[tag_index].name = images.tags[tag_index].name; 
            }
        }*/
    }
}

// Convert Tag Type and Tag Type ID to be compatible with Grabber
function tag_type_compat(tags: ITag): void {
    if (typeof tags.typeId === "number") { // type check
        tags.typeId = TAG_NAME_TO_TTYPE_ID_MAP[tags.typeId] || 0;
    }
    if (typeof tags.type === "string") { // type check
        tags.type = TAG_NAME_TO_GRB_TTYPE_MAP[tags.type] || "general";
    }
}

// Fill in placeholders if no preview image is available (ex. swf file)
function fill_placeholder_preview(images: IImage): void {
    if (!images.preview_url) {
        images.preview_url = "/favicon.ico";
    }
}

// Returns the extracted tags as a string separated by commas.
function extracted_tags_to_string(tags: ITag[]): string {
    let result = String();
    let tag_temp = String();
    for (let tag_index = 0; tag_index < tags.length; tag_index++) {
        tag_temp = tags[tag_index].name.trim(); // Remove left and right spaces
        tag_temp = tag_temp.replace(/^(~[!|+@])\s?/, ''); // Remove prefix, For spaces between prefixes and words, use lazy quantifiers by limiting to 1 in the Grabber.regexToTags function.
        result = result.concat(tag_temp);
        if (tag_index < tags.length - 1) {
            result = result.concat(',');
        }
    }
    return result;
}

// Separate search tags
// Prefix: (no prefix):And, ~|:Or, ~!:Filter, ~+:Unless
// The Permanent Booru's tags will not be searched as intended if they match the prefixes used by the search keyword parser.
// The search parser currently appears to be functioning normally, but it may fail due to various tags in The Permanent Booru that do not conform to its rules. Therefore, we need your feedback.
function search_keyword_parser(search_query: ISearchQuery): Record<string, any>  {
    const parsed_keyword: Record<string, any> = {};
    const extracted_tags_and = Grabber.regexToTags("(?<name>(?:^|(?<!\\\\,)(?<=,))(?!\\s*(?:~[+|!@]))(?:\\\\,|[^,])+(?:(?=,)|$))", search_query.search); // Hints about AND regular expressions came from generative artificial intelligence(Gemini-3.1-Pro).
    const extracted_tags_filter = Grabber.regexToTags("(?<name>(?<![^,]|\\\\,)(?=\\s*~!)(?:\\\\,|[^,])+)", search_query.search);
    const extracted_tags_or = Grabber.regexToTags("(?<name>(?<![^,]|\\\\,)(?=\\s*~\\|)(?:\\\\,|[^,])+)", search_query.search);
    const extracted_tags_unless = Grabber.regexToTags("(?<name>(?<![^,]|\\\\,)(?=\\s*~\\+)(?:\\\\,|[^,])+)", search_query.search);
    const extracted_advanced_option = Grabber.regexToTags("(?<name>(?<![^,]|\\\\,)(?=\\s*~@)(?:\\\\,|[^,])+)", search_query.search);
    parsed_keyword["and"] = extracted_tags_to_string(extracted_tags_and);
    parsed_keyword["filter"] = extracted_tags_to_string(extracted_tags_filter);
    parsed_keyword["or"] = extracted_tags_to_string(extracted_tags_or);
    parsed_keyword["unless"] = extracted_tags_to_string(extracted_tags_unless);
    parsed_keyword["advanced"] = extracted_tags_to_string(extracted_advanced_option);
    return parsed_keyword;
}

// Get the source from the image details page.
function regexToSources(regexp: string, src: string): string[] {
    const urls = Grabber.regexMatches(regexp, src);
    const result = [];
    for (let url_index = 0; url_index < urls.length; url_index++) {
        result[url_index] = urls[url_index]["url"];
    }
    return result;
}

/* In case of JavaScript, if <IImage object>.tags, which is information received through Grabber.
 * regexToImages() in search->parse, is a string, Grabber automatically extracts the rating.
 * However, when writing in TypeScript, <IImage object>.tags must be of type string[] or ITag[].
 * If this constraint is met, tags are stored as string[] (e.g., ["tag1", "tag2", "tag3"]).
 * In this case, Grabber does not automatically extract the rating.
*/
/* There are many variations of the ratring tag, but in this case we only deal with safe, questionable, and explicit.
 * And when there are multiple levels of rating, the priority is explicit > questionable > safe.
*/
// Extract ratring from tags extracted from search->parse.
function fill_rating_from_string_tag(images: IImage): void {
    if (images.tags) {
        if (isITagArr(images.tags)) {
            if (images.tags.filter( (itag: ITag) => { return itag.name === "rating:safe"; }).length > 0) {
                images.rating = "safe";
            }
            if (images.tags.filter( (itag: ITag) => { return itag.name === "rating:questionable"; }).length > 0) {
                images.rating = "questionable";
            }
            if (images.tags.filter( (itag: ITag) => { return itag.name === "rating:explicit"; }).length > 0) {
                images.rating = "explicit";
            }
        }
        else if (isStringArr(images.tags)) {
            if (images.tags.indexOf("rating:safe") > -1) {
                images.rating = "safe";
            }
            if (images.tags.indexOf("rating:questionable") > -1) {
                images.rating = "questionable";
            }
            if (images.tags.indexOf("rating:explicit") > -1) {
                images.rating = "explicit";
            }
        }
    }
}

// HTML Entity code to Normal Character
// code from https://velog.io/@sisofiy626/JS-HTML-entity와-변환
function recover_html_entity(html_str: string): string {
        return html_str.replace(/&#\d+;/g, (matched) => html_entity_normal_character_maps[matched] || matched);
}

// wrapper traveling the name of the ITag
function recover_html_entity_itag_wrapper(tag: ITag): void {
    tag.name = recover_html_entity(tag.name);
}

// Json to IImage
function jason_to_iimage(image: Record<string, any>): IImage {
    const img = Grabber.mapFields(image, imgMap);
    // I haven't figured out yet what "Removed" and "Deleted" do.
    img.status = "active";
    if (image.Removed) {
        img.status = "flagged";
    }
    else if (image.Deleted) {
        img.status = "deleted";
    }
    const tags: ITag[] = [];
    let name = undefined;
    let type = undefined;
    let count = undefined;
    let typeId = undefined;
    for (const tag_index in image.Tags) {
        name = (image.Tags[tag_index].Namespace === "none") ? (image.Tags[tag_index].Tag) : (image.Tags[tag_index].Namespace + ':' + image.Tags[tag_index].Tag);
        typeId = TAG_NAME_TO_TTYPE_ID_MAP[image.Tags[tag_index].Namespace] || 0;
        type = TAG_NAME_TO_GRB_TTYPE_MAP[image.Tags[tag_index].Namespace] || "general";
        count = image.Tags[tag_index].Count;
        tags.push({ name, type, count, typeId });
    }
    img.tags = tags;
    img.ext = Grabber.regexMatch("(?<=\\.)\\w+$", img.name)[0]; // extension from file name
    img.name = Grabber.regexMatch("(?<=/)\\p{Hex_Digit}{64}", img.name)[0]; // Remove url and extension parts
    return img;
}

// Creating URL parameters for advanced search options
function mk_adva_url_para(parameters: string): string {
    // Collect alts - alts= on | 
    // Tombstone - tombstone= on | 
    // Since last - since= day | week | month | year
    // Order - order= desc | asc | random | score
    // Mime(multiple) - mime= application | application/x-shockwave-flash | image | image/apng | image/gif | image/jpeg | image/png | video | video/mp4 | video/quicktime | video/webm | video/x-flv | video/x-m4v | video/x-matroska | video/x-msvideo
    let ret = String();
    // default option
    const advanced_search_option: Record<string, any> = {
        "alts": false,
        "tombstone": false,
        "since": "",
        "order": "desc",
        "mime": [],
    };
    const params = parameters.split(',')

    // Analyzing Advanced Search Options
    let param = undefined;
    for (let idx = 0; idx < params.length; idx++) {
        param = params[idx].split(':');
        if (param[0] === "alts") {
            advanced_search_option["alts"] = true;
        }
        else if (param[0] === "tombstone") {
            advanced_search_option["tombstone"] = true;
        }
        else if (param[0] === "since") {
            advanced_search_option["since"] = param[1];
        }
        else if (param[0] === "order") {
            advanced_search_option["order"] = param[1];
        }
        else if (param[0] === "mime") {
            advanced_search_option["mime"].push(param[1]);
        }
    }
    
    // Generate URL parameters
    if (advanced_search_option["alts"]) {
        ret = ret.concat("&alts=on");
    }
    if (advanced_search_option["tombstone"]) {
        ret = ret.concat("&tombstone=on");
    }
    if (advanced_search_option["since"] !== "") {
        ret = ret.concat("&since=" + advanced_search_option["since"]);
    }
    ret = ret.concat("&order=" + advanced_search_option["order"]);
    for (let idx = 0; idx < advanced_search_option["mime"].length; idx++) {
        ret = ret.concat("&mime=" + encodeURIComponent(advanced_search_option["mime"][idx]));
    }

    return ret;
}

// -------- Custom Function End --------

export const source: ISource = {
    name: "The Permanent Booru",
    modifiers: ["rating:", "meta:", "medium:", "series:", "gender:", "species:", "creator:", "character:"], // Tag types defined in the CSS file
    tagFormat: {
        case: "lower",
        wordSeparator: " ",
    },
    searchFormat: {
        and: {
            separator: ",",
            prefix: "",
        },
        or: {
            separator: ",",
            prefix: "~|",
        },
        parenthesis: false,
        precedence: "or",
    },
    auth: {
        session: {
            type: "post",
            url: "/login/",
            fields: [
                {
                    id: "pseudo",
                    key: "username",
                },
                {
                    id: "password",
                    key: "password",
                    type: "password",
                },
                {
                    // Captcha Challenge Token (Check through the browser's developer tools)
                    // HTML ex. <input type="hidden" name="key" value="{Here is the captcha token value}">
                    // I hope that in the future we can load captcha images from Grabber
                    id: "accessToken",
                    key: "key",
                    type: "text",
                },
                {
                    // Captcha Challenge Answer
                    // Response to captcha image (text inside the image)
                    id: "refreshToken",
                    key: "code",
                    type: "text",
                },
            ],
            check: {
                type: "cookie",
                key: "session",
            },
        },
    },
    apis: {
        html: {
            name: "Regex",
            auth: [],
            forcedLimit: 250, // page per image limit
            forcedTokens: [], // If there is information listed in this list that cannot be retrieved from the image list, open the image detail page to retrieve the information.
            search: {
                parseErrors: true,
                url: (query: ISearchQuery, opts: IUrlOptions, previous: IPreviousSearch | undefined): string | IError => {
                    try {
                        const vaild_page = Grabber.pageUrl(query.page, previous, Number.MAX_VALUE, "{page}", "{max}", "{min}");
                        // Since this booru receives the search query as multiple parameters instead of one, it is necessary to properly separate them and pass them to the appropriate parameters.
                        // Prefix: (no prefix):And, ~|:Or, ~!:Filter, ~+:Unless
                        const parsed_keyword = search_keyword_parser(query);
                        return "/posts/" + vaild_page + '/' + encodeURIComponent(parsed_keyword["and"]) + "?filter=" + encodeURIComponent(parsed_keyword["filter"]) + "&or=" + encodeURIComponent(parsed_keyword["or"]) + "&unless=" + encodeURIComponent(parsed_keyword["unless"]) + mk_adva_url_para(parsed_keyword["advanced"]); // query.page is deprecated and should be replaced with opts.page in the future.
                    }
                    catch (e: any) {
                        return { error: e.message };
                    }
                },
                parse: (src: string, statusCode: number): IParsedSearch | IError => {
                    if (!src.match(/^<!DOCTYPE html>\s+<html>/)) {
                        return { error: "Server Error(HTTP" + statusCode.toString() + "): " + src };
                    }
                    const images = Grabber.regexToImages('<div\\s+data-context-menu="thumbnail"\\s+data-id="(?<id>\\d+)"\\s+data-sha256="(?<sha256>\\p{Hex_Digit}{64})"\\s+data-md5="(?<md5>\\p{Hex_Digit}{32})"\\s+data-tags="(?<tags>[^"]+)"\\s+data-file-url="(?<file_url>[\\/\\.\\d\\w]+)"\\s+class="thumbnail (image|video|application)\\s+" >\\s+(<img src="(?<preview_url>[\\d\\w\\/\\.]+)" alt="\\p{Hex_Digit}{64}" class="">\\s+<div class="tagbox hint">\\s+<div class="score">\\s+<div><span>[\\w\\d\\s]+</span></div>\\s+<div><span>Score:\\s+(?<score>[\\d.]+)</span></div>)?', src);
                    const imageCount = Grabber.regexMatch('<div id="sidebar">\\s+<div>(?<image_count>\\d+)</div>', src);
                    const page_navigator = Grabber.regexMatch('<div class="paginator">\\s+(<span(><a href="(?<first_page_url>/posts/(?<first_page_number>\\d+)(/[^"]*)?)">First</a>|><a href="(?<previous_page_url>/posts/(?<previous_page_number>\\d+)(/[^"]*)?)">Previous</a>| class="current-page">(?<current_page_number>\\d+)|><a href="(?<next_page_url>/posts/(?<next_page_number>\\d+)(/[^"]*)?)">Next</a>|><a href="(?<last_page_url>/posts/(?<last_page_number>\\d+)(/[^"]*)?)">Last</a>|><a href="/posts/\\d+(/[^"]*)?">\\d+</a>)+</span>\\s+)+</div>', src);
                    const img_tags = Grabber.regexToTags('<tr>\\s+<td class="tag namespace-(?<type>none|rating|meta|medium|series|gender|species|creator|character|[^"]+)">\\s+<span class="tag-toggle" data-tag="[^"]+">\\+</span>\\s+<a href="[^"]+"><span>(?<name>[^"]+)</span></a>\\s+</td>\\s+<td class="counter">(?<count>\\d+)</td>\\s+</tr>', src);
                    images.forEach(tag_refinement);
                    images.forEach(fill_placeholder_preview);
                    images.forEach(fill_rating_from_string_tag);
                    img_tags.forEach(tag_type_compat);
                    img_tags.forEach(recover_html_entity_itag_wrapper);
                    return {
                        images: images,
                        imageCount: imageCount ? imageCount.hasOwnProperty("image_count") ? parseInt(imageCount["image_count"], 10) : 0 : 0,
                        pageCount: page_navigator ? page_navigator.hasOwnProperty("last_page_number") ? parseInt(page_navigator["last_page_number"], 10) : page_navigator.hasOwnProperty("current_page_number") ? parseInt(page_navigator["current_page_number"], 10) : 0 : 0,
                        //wiki: undefined,
                        tags: img_tags,
                        urlNextPage: page_navigator ? page_navigator.hasOwnProperty("next_page_url") ? page_navigator["next_page_url"] : undefined : undefined,
                        urlPrevPage: page_navigator ? page_navigator.hasOwnProperty("previous_page_url") ? page_navigator["previous_page_url"] : undefined : undefined,
                        //md5: undefined
                    };
                },
            },
            details: {
                fullResults: false,
                url: (id: string, md5: string): string => {
                    //return "/post/md5/" + md5; // view image by md5
                    //return "/post/sha356/" + sha256; // view image by sha256
                    return "/post/" + id;
                },
                parse: (src: string): IParsedDetails => {
                    const img_tags = Grabber.regexToTags('<tr>\\s+<td class="tag namespace-(?<type>none|rating|meta|medium|series|gender|species|creator|character|[^"]+)">\\s+<span class="tag-toggle" data-tag="[^"]+">\\+</span>\\s+<a href="[^"]+"><span>(?<name>[^"]+)</span></a>\\s+</td>\\s+<td class="counter">(?<count>\\d+)</td>\\s+</tr>', src);
                    img_tags.forEach(tag_type_compat);
                    img_tags.forEach(recover_html_entity_itag_wrapper);
                    return {
                        tags: img_tags,
                        imageUrl: Grabber.regexToConst("url", '<a href="(?<url>[\\d\\w\\/\\.]+)" download>Download</a>', src),
                        createdAt: Grabber.regexToConst("date", '<div class="metadata">\\s+<div>[\\w\\d\\/]+</div>\\s+<div title="\\d+">[\\w\\d\\.\\s]+</div>\\s+<div title="[\\w\\d\\s]+">(?<date>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})</div>', src),
                        sources: regexToSources('<div title="(?:[\\w]+://)[^"]+">\\s+<a href="(?<url>(?:[\\w]+://)[^"]+)">(?:[\\w]+://)[^<]+</a>\\s+</div>', src),
                        // This booru doesn't seem to show a pool link. If you look at the detailed image, you'll see something that looks like a pool, but it's called an "alt-group," which is similar to a pool but not strictly speaking a pool.
                        //pools: Grabber.regexToPools('~~~~~~', src),
                    };
                },
            },
            /*
             * The Permanent Booru offers both image Booru and gallery services.
             * However, we have decided to temporarily discontinue this feature as image board and gallery cannot be displayed simultaneously in search results.
             * Even if it were possible, there are concerns that it could clutter search results.
             * The commented code below is written in JavaScript and needs to be modified(To TS).
             * Code snippets for the future
             */
            /*
            gallery: {
                url: function (query) {
                    return "/comics/" + query.id;
                },
                parse: function (src) {
                    console.warn(src);
                    var images = Grabber.regexToImages('<div id="diff_\\d*"[^>]*>.*?<img src="(?<file_url>[^"]+)"', src).map(completeImage);
                    return {
                        images: images,
                        pageCount: 1,
                        imageCount: images.length,
                    };
                },
            },
            */
            /*
             * The Permanent Booru does not appear to have a pool list.
             * There is a way to access the pool through the user information page.
             */
            /*
             * Bad news: I checked other image board request URLs with pool functionality via Grabber's pool tab and found that Grabber works by searching for pool:poolID in the basic search query. However, The Permanent Booru doesn't support searching for pools via basic search.
             * In other words, the method of accessing the URL directly through the pool ID in the Pool tab of Grabber must be supported.
             * I found out later that endpoints can support various search modes and supposedly provide advanced features, but I couldn't figure out how or when the endpoint in endpoints are triggered even after checking the models.ts files of other sources.
             */
            /*
            endpoints: {
                pool_list: {
                    name: "Pools",
                    input: {},
                    url: function (query, opts) {
                        var pid = (opts.page - 1) * 25;
                        console.warn(query, opts);
                        return "/index.php?page=pool&s=list&pid=" + String(pid);
                    },
                    parse: function (src) {
                        var html = Grabber.parseHTML(src);
                        var images = [];
                        var rows = html.find("table tr");
                        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                            var row = rows_1[_i];
                            var parts = row.find("td");
                            var link = parts[1].find("a")[0];
                            var id = link.attr("href").match(/id=(\d+)/)[1];
                            images.push({
                                id: id,
                                name: link.innerText(),
                                type: "gallery",
                                gallery_count: parts[2].innerText().match(/(\d+)\s+Images/)[1],
                                details_endpoint: {
                                    endpoint: "pool_details",
                                    input: { id: id },
                                },
                            });
                        }
                        return { images: images };
                    },
                },
                pool_details: {
                    input: {
                        id: {
                            type: "input",
                        },
                    },
                    url: function (query) {
                        console.info(query);
                        return "/index.php?page=pool&s=show&id=" + String(query.id);
                    },
                    parse: function (src) {
                        // The regular expression below conflicts with the comment mark, so inline comments are used.
                        *///var images = Grabber.regexToImages('<span[^>]*(?: id="?\\w(?<id>\\d+)"?)?>\\s*<a[^>]*(?: id="?\\w(?<id_2>\\d+)"?)[^>]*>\\s*<img [^>]*(?:src|data-original)="(?<preview_url>[^"]+/thumbnail_(?<md5>[^.]+)\\.[^"]+)" [^>]*title="\\s*(?<tags>[^"]+)"[^>]*/?>\\s*</a>|<img\\s+class="preview"\\s+src="(?<preview_url_2>[^"]+/thumbnail_(?<md5_2>[^.]+)\\.[^"]+)" [^>]*title="\\s*(?<tags_2>[^"]+)"[^>]*/?>', src);
                        /*return {
                            images: images.map(completeImage),
                        };
                    },
                },
            },
            */
            tags: {
                url: (query: ITagsQuery, opts: IUrlOptions): string => {
                    return "/tags/" + query.page; // query.page is deprecated and should be replaced with opts.page in the future.
                },
                parse: (src: string): IParsedTags => {
                    const parsed_tags = Grabber.regexToTags('<div class="tag-toggle" data-tag="[^"]+">\\+</div>\\s+<div class="tag namespace-(?<type>none|rating|meta|medium|series|gender|species|creator|character|[^"]+)"><a href="/tags/\\d+/(?<id>\\d+)">(?<name>[^<]+)</a></div>\\s+<div class="count">(?<count>\\d+)</div>', src);
                    parsed_tags.forEach(tag_type_compat);
                    parsed_tags.forEach(recover_html_entity_itag_wrapper);
                    return {
                        tags: parsed_tags,
                    };
                },
            },
            /*
             * The Permanent Booru only displays a list of tags. There is no page where you can search by tag category.
             * The commented code below is written in JavaScript and needs to be modified(to TS).
             * Code snippets for the future
             */
            /*
            tagTypes: {
                url: function () {
                    return "/tag";
                },
                parse: function (src) {
                    var contents = src.match(/<select[^>]* name="type"[^>]*>([\s\S]+)<\/select>/);
                    if (!contents) {
                        return { error: "Parse error: could not find the tag type <select> tag" };
                    }
                    var results = Grabber.regexMatches('<option value="(?<id>\\d+)">(?<name>[^<]+)</option>', contents[1]);
                    var types = results.map(function (r) { return ({
                        id: r.id,
                        name: r.name.toLowerCase(),
                    }); });
                    return { types: types };
                },
            },
            */
            check: {
                url: (): string => {
                    return "/";
                },
                parse: (src: string): boolean => {
                    return src.search('<div class="logo">The Permanent Booru</div>') !== -1;
                },
            },
        },
        json: {
            name: "JSON",
            auth: [],
            maxLimit: 50,
            search: {
                parseErrors: true,
                url: (query: ISearchQuery, opts: IUrlOptions, previous: IPreviousSearch | undefined): string | IError => {
                    try {
                        // Since this booru receives the search query as multiple parameters instead of one, it is necessary to properly separate them and pass them to the appropriate parameters.
                        // Prefix: (no prefix):And, ~|:Or, ~!:Filter, ~+:Unless
                        const vaild_page = Grabber.pageUrl(query.page, previous, Number.MAX_VALUE, "{page}", "{max}", "{min}") - 1; // start at 0
                        const parsed_keyword = search_keyword_parser(query);
                        return "/api/v1/posts?" + "offset=" + vaild_page + "&tags=" + encodeURIComponent(parsed_keyword["and"]) + "&filter=" + encodeURIComponent(parsed_keyword["filter"]) + "&or=" + encodeURIComponent(parsed_keyword["or"]) + "&unless=" + encodeURIComponent(parsed_keyword["unless"]) + mk_adva_url_para(parsed_keyword["advanced"]); // query.page is deprecated and should be replaced with opts.page in the future.
                    } catch (e: any) {
                        return { error: e.message };
                    }
                },
                parse: (src: string): IParsedSearch | IError => {
                    const data = JSON.parse(src);
                    if (data["Error"]) {
                        return { error: data["Error"] + '(' + data["Code"] + ')'};
                    }
                    const image_count = parseInt(data["TotalPosts"], 10);
                    const images: IImage[] = [];
                    for (let i = 0; i < data["Posts"].length; i++) {
                        images.push(jason_to_iimage(data["Posts"][i]));
                    }
                    images.forEach(fill_rating_from_string_tag);
                    images.forEach(fill_placeholder_preview);
                    return {
                        images: images,
                        imageCount: image_count,
                        pageCount: Math.ceil(image_count / 50),
                    };
                },
            },
        },
    },
};
