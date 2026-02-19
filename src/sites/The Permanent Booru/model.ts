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
*/

/* This booru sets the number of images per page as OPTION method instead of passing it as GET method.
 * So if you want to change the number of images per page, you need to change the cookie value in the source settings.
*/

// Sometimes comments on a line are taken from another model.js, but it is not clear what they are used for.

// -------- Typescript Helper Start --------

// Check if an object is an ITag interface
function isITagArr(obj: any): obj is ITag[]{
    return "name" in obj;
}

// Check if an object is an String Array
function isStringArr(obj: any): obj is string[] {
    return typeof obj === 'object';
}

// Check if an object is an String
function isString(obj: any): obj is string {
    return typeof obj === 'string';
}

// -------- Typescript Helper End --------


// -------- Custom Function Start --------

// Convert to be compatible with existing tag DB
function tag_refinement(images: IImage): void {
    if (images.tags) {
        if (isString(images.tags)) {
            images.tags = JSON.parse('{"tags":'+images.tags.toString().replace(/&#34;/gi, '"')+'}')["tags"]; // remove &quot;(HTML special characters) and string to String Array
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
const TAG_NAME_TO_TTYPE_ID_MAP: Record<string, any> = {
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
const TAG_NAME_TO_GRB_TTYPE_MAP: Record<string, any> = {
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
function tag_type_compat(tags: ITag): void {
    if (typeof tags.typeId === "number") { // type check
        const replace_tag_typeId = TAG_NAME_TO_TTYPE_ID_MAP[tags.typeId];
        tags.typeId = replace_tag_typeId === undefined ? 0 : replace_tag_typeId;
    }
    if (typeof tags.type === "string") { // type check
        const replace_tag_type = TAG_NAME_TO_GRB_TTYPE_MAP[tags.type];
        tags.type = replace_tag_type === undefined ? "general" : replace_tag_type;
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
    for (let tag_index = 0; tag_index < tags.length; tag_index++) {
        result = result.concat(tags[tag_index].name);
        if (tag_index < tags.length - 1) {
            result = result.concat(", ");
        }
    }
    return result;
}

// Separate search tags
// Prefix: (no prefix):And, ~|:Or, ~!:Filter, ~+:Unless
// The Permanent Booru's tags will not be searched as intended if they match the prefixes used by the search keyword parser.
function search_keyword_parser(search_query: ISearchQuery): Record<string, any>  {
    const parsed_keyword: Record<string, any> = {};
    const extracted_tags_and = Grabber.regexToTags("(?<name>(?:(?<![^\\s~\\|!\\+\\,])(?=[^\\s~\\|!\\+\\,])|(?<=[^\\s~\\|!\\+\\,])(?![^\\s~\\|!\\+\\,]))(?<!(?:~\\||~!|~\\+))[^,]+)", search_query.search);
    const extracted_tags_filter = Grabber.regexToTags("(?<name>(?<=~!)((?!~\\||~!|~\\+|,).)*)", search_query.search);
    const extracted_tags_or = Grabber.regexToTags("(?<name>(?<=~\\|)((?!~\\||~!|~\\+|,).)*)", search_query.search);
    const extracted_tags_unless = Grabber.regexToTags("(?<name>(?<=~\\+)((?!~\\||~!|~\\+|,).)*)", search_query.search);
    parsed_keyword["and"] = extracted_tags_to_string(extracted_tags_and);
    parsed_keyword["filter"] = extracted_tags_to_string(extracted_tags_filter);
    parsed_keyword["or"] = extracted_tags_to_string(extracted_tags_or);
    parsed_keyword["unless"] = extracted_tags_to_string(extracted_tags_unless);
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
        if (isStringArr(images.tags)) {
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
        // I don't think ITag[] will ever be used as an argument in this function.
        else if (isITagArr(images.tags)) {
            if (images.tags.filter( (itag) => { return itag.name === "rating:safe"; }).length > 0) {
                images.rating = "safe";
            }
            if (images.tags.filter( (itag) => { return itag.name === "rating:questionable"; }).length > 0) {
                images.rating = "questionable";
            }
            if (images.tags.filter( (itag) => { return itag.name === "rating:explicit"; }).length > 0) {
                images.rating = "explicit";
            }
        }
    }
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
                        return "/posts/" + vaild_page + '/' + encodeURIComponent(parsed_keyword["and"]) + "?filter=" + encodeURIComponent(parsed_keyword["filter"]) + "&or=" + encodeURIComponent(parsed_keyword["or"]) + "&unless=" + encodeURIComponent(parsed_keyword["unless"]); // query.page is deprecated and should be replaced with opts.page in the future.
                    }
                    catch (e: any) {
                        return { error: e.message };
                    }
                },
                parse: (src: string, statusCode: number): IParsedSearch | IError => {
                    if (!src.match(/^<!DOCTYPE html>\s+<html>/)) {
                        return { error: "Server Error(HTTP" + statusCode.toString() + "): " + src };
                    }
                    const images = Grabber.regexToImages('<div\\s+data-context-menu="thumbnail"\\s+data-id="(?<id>\\d+)"\\s+data-sha256="(?<sha256>\\p{Hex_Digit}{64})"\\s+data-md5="(?<md5>\\p{Hex_Digit}{32})"\\s+data-tags="(?<tags>\\[(&#34;(?:(?!(?<!\\\\)&#34;).)+&#34;,?)+\\])"\\s+data-file-url="(?<file_url>[\\/\\.\\d\\w]+)"\\s+class="thumbnail (image|video|application)\\s+" >\\s+(<img src="(?<preview_url>[\\d\\w\\/\\.]+)" alt="\\p{Hex_Digit}{64}" class="">\\s+<div class="tagbox hint">\\s+<div class="score">\\s+<div><span>[\\w\\d\\s]+</span></div>\\s+<div><span>Score:\\s+(?<score>[\\d.]+)</span></div>)?', src);
                    const imageCount = Grabber.regexMatch('<div id="sidebar">\\s+<div>(?<image_count>\\d+)</div>', src);
                    const page_navigator = Grabber.regexMatch('<div class="paginator">\\s+(<span(><a href="(?<first_page_url>/posts/(?<first_page_number>\\d+)(/[^"]*)?)">First</a>|><a href="(?<previous_page_url>/posts/(?<previous_page_number>\\d+)(/[^"]*)?)">Previous</a>| class="current-page">(?<current_page_number>\\d+)|><a href="(?<next_page_url>/posts/(?<next_page_number>\\d+)(/[^"]*)?)">Next</a>|><a href="(?<last_page_url>/posts/(?<last_page_number>\\d+)(/[^"]*)?)">Last</a>|><a href="/posts/\\d+(/[^"]*)?">\\d+</a>)+</span>\\s+)+</div>', src);
                    const img_tags = Grabber.regexToTags('<tr>\\s+<td class="tag namespace-(?<type>none|rating|meta|medium|series|gender|species|creator|character|[^"]+)">\\s+<span class="tag-toggle" data-tag="[^"]+">\\+</span>\\s+<a href="[^"]+"><span>(?<name>[^"]+)</span></a>\\s+</td>\\s+<td class="counter">(?<count>\\d+)</td>\\s+</tr>', src);
                    images.forEach(tag_refinement);
                    images.forEach(fill_placeholder_preview);
                    images.forEach(fill_rating_from_string_tag);
                    img_tags.forEach(tag_type_compat);
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
    },
};
