import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { Button } from '../Button/index';
import { darken } from 'polished';

export const Table = styled.table`
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  height: calc(100% - 32px);
  border-spacing: 0;
`;

interface CWProps {
  calendarWidth: number | undefined;
}

export const CalendarWrapper = styled.div<CWProps>`
  width: ${(props): string | FlattenSimpleInterpolation | undefined =>
    props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
  display: flex;
  height: ${(props): string | FlattenSimpleInterpolation | undefined =>
    props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
  flex-flow: column;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const CalendarTitle = styled.div`
  flex: 1 1;
  text-align: left;
  span {
    margin: 0;
    padding-left: 5px;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 20px;
    color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};
    display: inline-block;
  }
`;

export const CalendarControl = styled.div`
  margin-left: 10px;
  button:first-of-type {
    margin-right: 15px;
  }
`;

export const SvgWrapper = styled.span`
  width: 16px;
  display: block;
`;

export const CalendarControlButtons = styled(Button)`
  font-size: 20px;
  line-height: 0;
  &:first-child {
    margin-right: 10px;
  }
`;

export const Day = styled.td`
  text-align: center;
  box-sizing: border-box;
  position: relative;
  padding: 0;
  vertical-align: top;
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};

  &.has-todos {
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      background-color: turquoise;
      position: absolute;
      bottom: 5px;
      left: 16px;
      border-radius: 50%;
    }
  }
  &.current-day:not(.other-month) {
    div {
      .day-number {
        border: solid 1px tomato;
      }
    }
  }
  &.selected-day:not(.other-month) {
    div:not(:focus) {
      .day-number {
        background-color: tomato;
        color: #fff;
      }
    }
  }
  &:hover:not(.selected-day):not(.other-month) {
    div:not(:focus) {
      .day-number {
        background-color: ${color.primary};
        color: #fff;
        cursor: pointer;
      }
    }
  }
  &.other-month {
    color: ${color.mediumdark};
  }

  &:not(other-month) {
    .day-wrapper {
      &:hover {
        color: #fff !important;
      }
    }
  }
  .day-wrapper {
    height: 100%;
    width: 100%;
    min-height: 30px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: transparent;
    border: none;
    justify-content: center;

    .day-number {
      width: 25px;
      padding-top: 5px;
      height: 25px;
      border-radius: 5px;
      box-sizing: border-box;
    }
    &:focus {
      outline: none;
      .day-number {
        box-sizing: border-box;
        background-color: ${color.primary};
        color: #fff;
      }
    }
    &.other-month {
      color: ${(props): string => (props.theme === 'dark' ? darken(0.2, color.darkModeLight) : color.medium)};
    }
    &.other-month:hover {
      cursor: default;
    }
  }
`;

export const DayName = styled.th`
  text-align: center;
  padding: 5px;
  font-size: 13px;
  color: ${color.darkest};
  width: 14%;
  border-bottom: solid 1px ${color.medium};
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};
`;

export const Week = styled.tr``;
