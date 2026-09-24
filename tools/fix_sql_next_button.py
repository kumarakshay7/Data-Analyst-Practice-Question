from pathlib import Path

page = Path('practice.html')
text = page.read_text(encoding='utf-8')

script = '<script src="sql_next_button.js"></script>'

if script not in text:
    marker = '</body>'
    if marker not in text:
        raise SystemExit('Could not find </body> in practice.html')
    text = text.replace(marker, script + marker, 1)
    page.write_text(text, encoding='utf-8')
    print('Added SQL Next button script to practice.html')
else:
    print('SQL Next button script is already loaded')
