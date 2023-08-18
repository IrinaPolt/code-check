import os
import datetime
import pep8
from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail

from .models import LogFile, CodeFile


current_dir = os.path.dirname(os.path.abspath(__file__))

@shared_task
def check_files_and_send_email():
    one_day_ago = datetime.datetime.now() - datetime.timedelta(days=1)

    files = CodeFile.objects.filter(updated_at__gte=one_day_ago)

    subject = "PEP8 Check Result"

    for file in files:
        code = file.text
        checker = pep8.Checker(
            lines=code.strip().splitlines(),
            filename=None,
            show_source=False
        )
        checker.check_all()
        report = checker.report
        output = []

        for line_num, offset, err_code, text, doc in report._deferred_print:
            if line_num > len(report.lines):
                line = ''
            else:
                line = report.lines[line_num - 1]
            output.append(
                '%(path)s:%(row)d:%(col)d: %(code)s %(text)s' % {
                    'path': report.filename,
                    'row': report.line_offset + line_num,
                    'col': offset + 1,
                    'code': err_code,
                    'text': text,
                })

        log = LogFile(user=file.author, file=file.title, log=output)
        log.save()

        message = f"File: {file.title}\n\nPEP8 Check Result:\n{output}"
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [file.author.email]
        )

    return 'success'
