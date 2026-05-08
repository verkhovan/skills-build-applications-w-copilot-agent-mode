from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel.name),
            User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel.name),
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel.name),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc.name),
            User.objects.create(name='Superman', email='superman@dc.com', team=dc.name),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc.name),
        ]

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        Activity.objects.create(user=users[0].name, type='run', duration=30, date='2023-01-01')
        Activity.objects.create(user=users[1].name, type='cycle', duration=45, date='2023-01-02')
        Activity.objects.create(user=users[2].name, type='swim', duration=25, date='2023-01-03')
        Activity.objects.create(user=users[3].name, type='run', duration=40, date='2023-01-01')
        Activity.objects.create(user=users[4].name, type='cycle', duration=35, date='2023-01-02')
        Activity.objects.create(user=users[5].name, type='swim', duration=50, date='2023-01-03')

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        Leaderboard.objects.create(team=marvel.name, points=120)
        Leaderboard.objects.create(team=dc.name, points=125)

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Situps', description='Do 30 situps', difficulty='easy')
        Workout.objects.create(name='Squats', description='Do 40 squats', difficulty='medium')
        Workout.objects.create(name='Plank', description='Hold plank for 1 min', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('Ensuring unique index on email for users...'))
        with connection.cursor() as cursor:
            cursor.db_conn['user'].create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
