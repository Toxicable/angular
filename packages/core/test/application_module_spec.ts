/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Injectable, LOCALE_ID, Logger} from '@angular/core';

import {describe, expect, inject, it} from '../testing/src/testing_internal';

import {_loggerFactory} from './../src/application_module';
import {ConsoleLogger, NoOpLogger} from './../src/logger';
import {TestBed} from './../testing/src/test_bed';

{
  describe('Application module', () => {
    it('should set the default locale to "en-US"',
       inject([LOCALE_ID], (defaultLocale: string) => { expect(defaultLocale).toEqual('en-US'); }));

    describe('Logger', () => {
      describe('factory', () => {
        it('should return NoOpLogger when disabled', () => {
          const logger = _loggerFactory({enabled: false});
          expect(logger instanceof NoOpLogger).toBe(true);
        });

        it('should return ConsoleLogger when enabled', () => {
          const logger = _loggerFactory({enabled: true});
          expect(logger instanceof ConsoleLogger).toBe(true);
        });

        it('should use isDevMode without options', () => {
          const logger = _loggerFactory();
          expect(logger instanceof ConsoleLogger).toBe(true);
        });
      });

      describe('should inject Logger service', () => {
        @Injectable()
        class DependsOnLogger {
          constructor(public logger: Logger) {}
        }

        beforeEach(() => TestBed.configureTestingModule({providers: [DependsOnLogger]}));

        it('works',
           () => expect(TestBed.get(DependsOnLogger).logger instanceof ConsoleLogger).toBe(true));
      });
    });
  });
}
