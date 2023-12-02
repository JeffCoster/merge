## CLI for Regression Testing

This section describes the command line interface that is used to regression test merger code. 
The same approach can be used for regression testing your own html that is rendered with merger.

It compares a baseline rendered html file, captured from a stable previous release, with html rendered with the current code of merger.
The baseline, and newly rendered html, normally use the same html template, mapping file, and mocked dataSource content.
However, to test new features, or for other reasons, the files and content can be edited to provide a new 'expected' baseline.

If the test of baseline html compares to the current render the console indicates a match, e.g.
> PASS: Baseline html: examples/test/product-list-baseline.html equals html rendered by Merger

If there are differences the console highlights each difference section with the expected render section, e.g.





