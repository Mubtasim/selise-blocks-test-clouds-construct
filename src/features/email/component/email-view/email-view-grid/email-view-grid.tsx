import { EmailViewProps, TReply } from 'features/email/types/email.types';
import empty_email from 'assets/images/empty_email.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Forward,
  History,
  Image,
  MailOpen,
  Paperclip,
  Reply,
  ReplyAll,
  Tag,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react';
import { Checkbox } from 'components/ui/checkbox';
import { Label } from 'components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import EmailViewResponseType from '../email-view-response-type';
import { Button } from 'components/ui/button';
import EmailActionsPanel from '../email-actions-panel';
import EmailTextEditor from '../../email-ui/email-text-editor';
import { EmailCompose } from '../../email-compose/email-compose';
import { htmlToPlainText } from 'features/email/services/email';
import React, { useState } from 'react';
import EmailTooltipConfirmAction from '../../email-ui/email-tooltip-confirm-action';
import EmailSingleActions from '../email-single-action';
import EmailActionsReplyPanel from '../email-actions-reply-panel';

export function EmailViewGrid({
  selectedEmail,
  statusLabels,
  viewState,
  handleTagChange,
  toggleEmailAttribute,
  checkedEmailIds,

  moveEmailToCategory,
  formatDateTime,
  activeAction,
  setActiveAction,
  handleSetActive,
  handleComposeEmailForward,
  content,
  handleContentChange,
  handleSendEmail,
  isComposing,
  addOrUpdateEmailInSent,
  handleCloseCompose,
  updateEmailReadStatus,
  handleToggleReplyVisibility,
  isReplyVisible,
  category,
  restoreEmailsToCategory,
  deleteEmailsPermanently,
  expandedReplies,
  toggleExpand,
  onSetActiveActionFalse,
  toggleReplyAttribute,
  setIsReplySingleAction,
  isReplySingleAction,
  activeActionReply,
  setActiveActionReply,
  handleSetActiveReply,
}: EmailViewProps) {
  const [, setReplyData] = useState<TReply | null>(null);

  return (
    <>
      <div
        className={`hidden md:flex h-[calc(100vh-130px)] w-full flex-col overflow-y-auto  ${!selectedEmail && 'bg-surface'}`}
      >
        {!selectedEmail && (
          <div className="flex h-full w-full flex-col gap-6 items-center justify-center p-8 text-center">
            <img src={empty_email} alt="emailSentIcon" />
            <h3 className="text-xl font-medium">Select a mail to read</h3>
          </div>
        )}
        {selectedEmail && (
          <React.Fragment>
            <div className=" bg-white z-50 flex justify-between my-4 px-4 gap-4  ">
              <div className="flex flex-wrap items-center px-4 gap-2">
                <p className="text-high-emphasis font-semibold">{selectedEmail?.subject}</p>

                {Object.keys(viewState)
                  .filter((key) => viewState[key] && statusLabels[key])
                  .map((key) => {
                    const { label, border, text } = statusLabels[key];
                    return (
                      <div
                        key={key}
                        className={`flex justify-center items-center gap-1 px-2 py-0.5 border ${border} rounded`}
                      >
                        <p className={`font-semibold text-xs ${text}`}>{label}</p>
                        <X
                          className="h-3 w-3 text-medium-emphasis cursor-pointer"
                          onClick={() => handleTagChange(key, false)}
                        />
                      </div>
                    );
                  })}
              </div>

              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Tag className="h-5 w-5 text-medium-emphasis cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {selectedEmail.tags &&
                      Object.keys(statusLabels).map((key) => (
                        <div key={key} className="flex items-center gap-2 px-4 py-2">
                          <Checkbox
                            id="select-all"
                            checked={viewState[key]}
                            onCheckedChange={(checked) => handleTagChange(key, !!checked)}
                          />
                          <Label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {statusLabels[key].label}
                          </Label>
                        </div>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <Tooltip>
                  <TooltipTrigger asChild>
                    <Star
                      className={`h-5 w-5 ${selectedEmail?.isStarred && 'text-warning'} cursor-pointer text-medium-emphasis`}
                      onClick={() => {
                        if (selectedEmail) {
                          toggleEmailAttribute(selectedEmail.id, 'isStarred');
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>{selectedEmail.isStarred ? 'Not starred' : 'Starred'}</p>
                  </TooltipContent>
                </Tooltip> */}
                {checkedEmailIds.length === 0 && (
                  <div className="flex gap-4">
                    {selectedEmail.isRead && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <MailOpen
                            className="h-5 w-5 cursor-pointer text-medium-emphasis"
                            onClick={() => updateEmailReadStatus(selectedEmail.id, category, false)}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-surface text-medium-emphasis"
                          side="top"
                          align="center"
                        >
                          <p>Mark as unread</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {category !== 'spam' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TriangleAlert
                            className="h-5 w-5 cursor-pointer text-medium-emphasis"
                            onClick={() => {
                              if (selectedEmail) {
                                moveEmailToCategory(selectedEmail.id, 'spam');
                              }
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-surface text-medium-emphasis"
                          side="top"
                          align="center"
                        >
                          <p>Spam</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {category !== 'trash' && category !== 'spam' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2
                            className="h-5 w-5 cursor-pointer text-medium-emphasis"
                            onClick={() => {
                              if (selectedEmail) {
                                moveEmailToCategory(selectedEmail.id, 'trash');
                              }
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-surface text-medium-emphasis"
                          side="top"
                          align="center"
                        >
                          <p>Trash</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {(category === 'trash' || category === 'spam') && (
                      <>
                        <EmailTooltipConfirmAction
                          tooltipLabel={`Restore item`}
                          confirmTitle="Restore item"
                          confirmDescription={`Are you sure you want to restore selected item?`}
                          onConfirm={() => restoreEmailsToCategory([selectedEmail.id])}
                          toastDescription={`Mail restored`}
                        >
                          <History className="h-5 w-5 cursor-pointer text-medium-emphasis hover:text-high-emphasis" />
                        </EmailTooltipConfirmAction>

                        <EmailTooltipConfirmAction
                          tooltipLabel={`Delete item permanently`}
                          confirmTitle="Delete mail Permanently"
                          confirmDescription={`Are you sure you want to permanently delete selected item? This action cannot be undone.`}
                          onConfirm={() => deleteEmailsPermanently([selectedEmail.id])}
                          toastDescription={`Mail deleted permanently`}
                        >
                          <Trash2 className="h-5 w-5 cursor-pointer text-medium-emphasis hover:text-high-emphasis" />
                        </EmailTooltipConfirmAction>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedEmail && (
              <div className="border-t ">
                <div>
                  <div className="my-6 px-4 flex items-start justify-between">
                    <EmailViewResponseType selectedEmail={selectedEmail} />
                    <EmailSingleActions
                      selectedEmail={selectedEmail}
                      formatDateTime={formatDateTime}
                      handleSetActiveReply={handleSetActiveReply}
                      handleComposeEmailForward={handleComposeEmailForward}
                      activeActionReply={activeActionReply}
                      handleSetActive={handleSetActive}
                      setIsReplySingleAction={
                        setIsReplySingleAction ??
                        (() => {
                          console.warn('setIsReplySingleAction is not defined');
                        })
                      }
                      isReplySingleAction={
                        isReplySingleAction ?? { isReplyEditor: false, replyId: '' }
                      }
                      onToggleStar={(emailId, replyId) => {
                        if (replyId) {
                          toggleReplyAttribute(emailId, replyId, 'isStarred');
                        } else {
                          toggleEmailAttribute(emailId, 'isStarred');
                        }
                      }}
                    />
                  </div>

                  <div className=" mb-6 text-sm px-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedEmail?.content || selectedEmail?.preview,
                      }}
                    />
                  </div>

                  {isReplySingleAction && isReplySingleAction.isReplyEditor && (
                    <>
                      <div className=" px-4 flex flex-col gap-6">
                        <EmailActionsReplyPanel
                          handleComposeEmailForward={handleComposeEmailForward}
                          selectedEmail={selectedEmail}
                          setActiveActionReply={setActiveActionReply}
                          activeActionReply={activeActionReply}
                          handleSetActiveReply={handleSetActiveReply}
                        />
                        <div>
                          <EmailTextEditor
                            value={content}
                            onChange={handleContentChange}
                            submitName="Send"
                            cancelButton="Discard"
                            // showIcons={true}
                            onSubmit={() =>
                              handleSendEmail(
                                selectedEmail.id,
                                (selectedEmail.sectionCategory as 'inbox') || 'sent'
                              )
                            }
                            onCancel={() => {
                              onSetActiveActionFalse();
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {((selectedEmail?.images?.length ?? 0) > 0 ||
                    (selectedEmail?.attachments?.length ?? 0) > 0) && (
                    <div className="px-4">
                      <div className="p-2 flex flex-col gap-3  bg-surface rounded">
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center text-medium-emphasis text-sm">
                            <Paperclip className="w-4 h-4" />
                            <p>{`${(selectedEmail?.images?.length ?? 0) + (selectedEmail?.attachments?.length ?? 0)} attachments`}</p>
                            {!isReplyVisible && (
                              <ChevronDown
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => handleToggleReplyVisibility()}
                              />
                            )}
                            {isReplyVisible && (
                              <ChevronUp
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => handleToggleReplyVisibility()}
                              />
                            )}
                          </div>
                          <div>
                            <Button variant={'link'}>
                              <Download className="h-4 w-4" />
                              Download All
                            </Button>
                          </div>
                        </div>
                        {isReplyVisible && (
                          <div className="grid grid-cols-2 gap-4">
                            {(selectedEmail?.attachments?.length ?? 0) > 0 &&
                              (selectedEmail?.attachments ?? []).map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="bg-white p-2 rounded">
                                    <FileText className="w-10 h-10 text-secondary-400" />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <p className="text-sm  text-high-emphasis">{attachment}</p>
                                    <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                  </div>
                                </div>
                              ))}
                            {(selectedEmail?.images?.length ?? 0) > 0 &&
                              (selectedEmail?.images ?? []).map((image, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="bg-white p-2 rounded">
                                    <Image className="w-10 h-10 text-secondary-400" />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <p className="text-sm  text-high-emphasis">{image}</p>
                                    <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-low-emphasis h-px mx-4 my-6" />
                </div>

                {selectedEmail && selectedEmail.reply && selectedEmail.reply.length > 0 && (
                  <div className="px-4">
                    {selectedEmail?.reply?.map((item, index) => {
                      const isExpanded = expandedReplies.includes(index);

                      return (
                        <div key={`reply-${index + 1}`}>
                          <div className="my-6 flex items-start justify-between">
                            <EmailViewResponseType selectedEmail={selectedEmail} />
                            <EmailSingleActions
                              selectedEmail={item}
                              formatDateTime={formatDateTime}
                              handleSetActiveReply={handleSetActiveReply}
                              handleComposeEmailForward={() => handleComposeEmailForward(item)}
                              activeActionReply={activeActionReply}
                              setIsReplySingleAction={setIsReplySingleAction}
                              handleSetActive={handleSetActive}
                              isReplySingleAction={
                                isReplySingleAction ?? { isReplyEditor: false, replyId: '' }
                              }
                              reply={item}
                              onToggleStar={() => {
                                toggleReplyAttribute(selectedEmail.id, item.id ?? '', 'isStarred');
                              }}
                              onReplyClick={() => {
                                setReplyData(item);
                                handleSetActive;
                              }}
                            />
                          </div>

                          <div
                            className={`cursor-pointer ${!isExpanded ? 'line-clamp-1' : ''}`}
                            onClick={() => {
                              toggleExpand(index);
                            }}
                          >
                            <div
                              className="text-sm "
                              dangerouslySetInnerHTML={{
                                __html: isExpanded ? item.reply : htmlToPlainText(item.reply),
                              }}
                            />
                            <div
                              className={`text-sm text-medium-emphasis  px-2`}
                              dangerouslySetInnerHTML={{
                                __html: item.prevData,
                              }}
                            />
                          </div>

                          {/* {isExpanded && (
                            <div className="flex justify-end">
                              <Button variant="link" onClick={() => toggleExpand(index)}>
                                Show less
                              </Button>
                            </div>
                          )} */}

                          {isReplySingleAction && item.id === isReplySingleAction.replyId && (
                            <>
                              {/* <div className="sticky bottom-0 px-4 flex flex-col gap-6 bg-white z-50 shadow-lg"> */}
                              <div className=" p-4 flex flex-col gap-6">
                                <EmailActionsReplyPanel
                                  handleComposeEmailForward={handleComposeEmailForward}
                                  selectedEmail={selectedEmail}
                                  setActiveActionReply={setActiveActionReply}
                                  activeActionReply={activeActionReply}
                                  handleSetActiveReply={handleSetActiveReply}
                                />

                                <div>
                                  <EmailTextEditor
                                    value={content}
                                    onChange={handleContentChange}
                                    submitName="Send"
                                    cancelButton="Discard"
                                    showIcons={true}
                                    onSubmit={() =>
                                      handleSendEmail(
                                        selectedEmail.id,
                                        (selectedEmail.sectionCategory as 'inbox') || 'sent',
                                        item
                                      )
                                    }
                                    onCancel={() => {
                                      onSetActiveActionFalse();
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          <div className="bg-low-emphasis h-px my-6" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {!(activeAction.reply || activeAction.replyAll || activeAction.forward) && (
              <div className="flex gap-4 text-sm  px-4 pb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSetActive('reply');
                  }}
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSetActive('replyAll');
                  }}
                >
                  <ReplyAll className="h-4 w-4" />
                  Reply All
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleComposeEmailForward()}>
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>
            )}

            {selectedEmail &&
              (activeAction.reply || activeAction.replyAll || activeAction.forward) && (
                <>
                  {/* <div className="sticky bottom-0 px-4 flex flex-col gap-6 bg-white z-50 shadow-lg"> */}
                  <div className=" px-4 flex flex-col gap-6">
                    <EmailActionsPanel
                      handleComposeEmailForward={handleComposeEmailForward}
                      selectedEmail={selectedEmail}
                      setActiveAction={setActiveAction}
                      activeAction={activeAction}
                      handleSetActive={handleSetActive}
                    />

                    <div>
                      <EmailTextEditor
                        value={content}
                        onChange={handleContentChange}
                        submitName="Send"
                        cancelButton="Discard"
                        showIcons={true}
                        onSubmit={() =>
                          handleSendEmail(
                            selectedEmail.id,
                            (selectedEmail.sectionCategory as 'inbox') || 'sent'
                          )
                        }
                        onCancel={() => {
                          onSetActiveActionFalse();
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
          </React.Fragment>
        )}

        {(isComposing.isCompose || isComposing.isForward) && (
          <EmailCompose
            addOrUpdateEmailInSent={addOrUpdateEmailInSent}
            onClose={handleCloseCompose}
            selectedEmail={selectedEmail}
            isComposing={isComposing}
          />
        )}
      </div>
    </>
  );
}
